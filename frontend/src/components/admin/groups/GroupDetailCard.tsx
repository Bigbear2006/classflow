import { UserMinus, X } from 'lucide-react';
import type { Group } from '../../../types.ts';
import { useEffect, useState } from 'react';
import { getGroup } from '../../../api/group.ts';

interface GroupDetailCardProps {
  groupId: number;
  closeModal: () => void;
}

export const GroupDetailCard = ({
  groupId,
  closeModal,
}: GroupDetailCardProps) => {
  const [group, setGroup] = useState<Group>({
    id: 0,
    courseId: 0,
    course: {
      id: 1,
      organizationId: 1,
      subject: {
        id: 1,
        name: 'Предмет',
        description: 'Описание предмета',
        image: 'placehold.co/400x600.png',
      },
      type: 'GROUP',
      price: 1200,
      paymentType: 'EVERY_LESSON',
      lessonType: 'ONLINE',
      lessonDuration: 45,
      lessonsCount: 10,
      teachersCount: 2,
      studentsCount: 10,
    },
    name: '',
    maxUsersCount: 0,
    createdAt: new Date(),
    students: [],
  });

  useEffect(() => {
    getGroup(groupId).then(setGroup);
  }, []);

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
              {group.students.length}/{group.maxUsersCount} учеников
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase mb-2">
              В группе
            </h3>
            {group.students.length === 0 && (
              <p className="text-sm text-slate-400">Учеников нет</p>
            )}
            <div className="space-y-2">
              {group.students.map(student => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-sm font-medium">
                      {student.fullname.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {student.fullname}
                      </div>
                      <div className="text-xs text-slate-400">
                        {student.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {}}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"
                  >
                    <UserMinus size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/*{notEnrolled.length > 0 && (*/}
          {/*  <div>*/}
          {/*    <h3 className="text-xs font-semibold text-slate-500 uppercase mb-2">*/}
          {/*      Добавить ученика*/}
          {/*    </h3>*/}
          {/*    <div className="space-y-2">*/}
          {/*      {notEnrolled.map(m => (*/}
          {/*        <div*/}
          {/*          key={m.id}*/}
          {/*          className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl"*/}
          {/*        >*/}
          {/*          <div className="flex items-center gap-2">*/}
          {/*            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-sm font-medium">*/}
          {/*              {m.user.fullname.charAt(0)}*/}
          {/*            </div>*/}
          {/*            <span className="text-sm text-slate-700">*/}
          {/*              {m.user.fullname}*/}
          {/*            </span>*/}
          {/*          </div>*/}
          {/*          <button*/}
          {/*            onClick={() =>*/}
          {/*              enrollInGroup(studentGroupId, m.userId)*/}
          {/*            }*/}
          {/*            className="p-1.5 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-600"*/}
          {/*          >*/}
          {/*            <UserPlus size={14} />*/}
          {/*          </button>*/}
          {/*        </div>*/}
          {/*      ))}*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      </div>
    </div>
  );
};
