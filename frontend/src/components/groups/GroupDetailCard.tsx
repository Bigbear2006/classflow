import { X } from 'lucide-react';
import type { GroupWithStudents, StudentStatus } from '../../entities';
import { activeStudentStatusConfig, pendingStudentStatusConfig } from '../../labels/lesson.tsx';
import { useUpdateStudentGroupMutation } from '../../hooks/mutations/group.ts';

interface GroupDetailCardProps {
  group: GroupWithStudents;
  closeModal: () => void;
}

export const GroupDetailCard = ({ group, closeModal }: GroupDetailCardProps) => {
  const activeStudents = group.students.filter(student => student.status === 'ACTIVE');
  const activeOrDeleted = group.students.filter(
    student => student.status === 'ACTIVE' || student.status === 'DELETED',
  );
  const pendingOrRejected = group.students.filter(
    student => student.status === 'PENDING' || student.status === 'REJECTED',
  );

  const mutation = useUpdateStudentGroupMutation();

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h2 className="font-semibold text-slate-900">{group.name}</h2>
            <p className="text-xs text-slate-400">
              {activeStudents.length}/{group.maxUsersCount} учеников
            </p>
          </div>
          <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase mb-2">В группе</h3>
            {activeOrDeleted.length === 0 && (
              <p className="text-sm text-slate-400">Учеников нет</p>
            )}
            <div className="space-y-2">
              {activeOrDeleted.map(student => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-sm font-medium">
                      {student.student.user.fullname.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {student.student.user.fullname}
                      </div>
                      <div className="text-xs text-slate-400">{student.student.user.email}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {activeStudentStatusConfig.map(({ status, label, color }) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() =>
                          mutation.mutate({
                            student_id: student.student.id,
                            group_id: student.groupId,
                            status: status as StudentStatus,
                          })
                        }
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                          group.students.find(s => s.id === student.id)?.status === status
                            ? color
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {pendingOrRejected.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase mb-2">
                Заявки в группу
              </h3>
              <div className="space-y-2">
                {pendingOrRejected.map(student => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-sm font-medium">
                        {student.student.user.fullname.charAt(0)}
                      </div>
                      <span className="text-sm text-slate-700">
                        {student.student.user.fullname}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {pendingStudentStatusConfig.map(({ status, label, color }) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() =>
                            mutation.mutate({
                              student_id: student.student.id,
                              group_id: student.groupId,
                              status: status as StudentStatus,
                            })
                          }
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                            group.students.find(s => s.id === student.id)?.status === status
                              ? color
                              : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
