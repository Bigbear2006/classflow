import { Edit2, Trash2, Users } from 'lucide-react';
import type { GroupWithStudents } from '../../entities';
import { useDeleteGroupMutation } from '../../hooks/mutations/group.ts';

interface GroupCardProps {
  group: GroupWithStudents;
  openDetail: (group: GroupWithStudents) => void;
  openEdit: (group: GroupWithStudents) => void;
}

export const GroupCard = ({ group, openDetail, openEdit }: GroupCardProps) => {
  const activeStudents = group.students.filter(student => student.status === 'ACTIVE');
  const pendingStudents = group.students.filter(student => student.status === 'PENDING');
  const mutation = useDeleteGroupMutation();

  return (
    <div
      key={group.id}
      className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-slate-900">{group.name}</h3>
          {group.defaultCabinet && (
            <p className="text-xs text-slate-400 mt-0.5">{group.defaultCabinet.number}</p>
          )}
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => openEdit(group)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => mutation.mutate(group.id)}
            className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>
            {activeStudents.length} из {group.maxUsersCount} учеников ({pendingStudents.length}{' '}
            заявок)
          </span>
          <span>{Math.round((activeStudents.length / group.maxUsersCount) * 100)}%</span>
        </div>

        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all"
            style={{
              width: `${Math.round((activeStudents.length / group.maxUsersCount) * 100)}%`,
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex -space-x-2">
          {activeStudents.slice(0, 4).map(student => (
            <div
              key={student.id}
              className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600"
            >
              {student.student.user.fullname.charAt(0)}
            </div>
          ))}
          {activeStudents.length > 4 && (
            <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs text-slate-500">
              +{activeStudents.length - 4}
            </div>
          )}
        </div>
        {activeStudents.length === 0 && (
          <span className="text-xs text-slate-400">Учеников нет</span>
        )}
      </div>

      <button
        onClick={() => openDetail(group)}
        className="w-full flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors"
      >
        <Users size={14} /> Управление учениками
      </button>
    </div>
  );
};
