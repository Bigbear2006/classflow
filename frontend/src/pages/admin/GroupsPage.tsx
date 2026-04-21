import { useEffect, useState } from 'react';
import type { Course, Group, ModalAction } from '../../types.ts';
import { Users, Plus, Trash2, Edit2 } from 'lucide-react';
import { deleteGroup, getGroups } from '../../api/group.ts';
import { GroupDetailCard } from '../../components/admin/groups/GroupDetailCard.tsx';
import { GroupForm } from '../../components/admin/groups/GroupForm.tsx';
import { getCourses } from '../../api/course.ts';

export default function GroupsPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [action, setAction] = useState<ModalAction | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(
    null,
  );
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  const openEdit = (groupId: number) => {
    setSelectedGroupId(groupId);
    setAction('EDIT');
  };

  const openDetail = (groupId: number) => {
    setSelectedGroupId(groupId);
    setAction('VIEW');
  };

  const closeModal = () => {
    setSelectedCourseId(null);
    setAction(null);
  };

  useEffect(() => {
    getCourses().then(setCourses);
    getGroups().then(setGroups);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 text-2xl font-semibold">Группы</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Управление учебными группами
          </p>
        </div>
        <button
          onClick={() => setAction('CREATE')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Новая группа
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {courses.map(course => (
          <button
            key={course.id}
            onClick={() => setSelectedCourseId(course.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
              selectedCourseId === course.id
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            {course.subject.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {groups.map(group => {
          return (
            <div
              key={group.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {group.name}
                  </h3>
                  {group.defaultCabinet && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      {group.defaultCabinet.number}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(group.id)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => deleteGroup(group.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="mb-3">
                {group.maxUsersCount && (
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>
                      {group.studentsCount} из {group.maxUsersCount} учеников
                    </span>
                    <span>
                      {Math.round(
                        (group.students.length / group.maxUsersCount) * 100,
                      )}
                      %
                    </span>
                  </div>
                )}
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all"
                    style={{
                      width: `${Math.round((group.students.length / group.maxUsersCount) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-2">
                  {group.students.slice(0, 4).map(student => (
                    <div
                      key={student.id}
                      className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600"
                    >
                      {student.fullname.charAt(0)}
                    </div>
                  ))}
                  {group.students.length > 4 && (
                    <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs text-slate-500">
                      +{group.students.length - 4}
                    </div>
                  )}
                </div>
                {group.students.length === 0 && (
                  <span className="text-xs text-slate-400">Учеников нет</span>
                )}
              </div>

              <button
                onClick={() => openDetail(group.id)}
                className="w-full flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Users size={14} /> Управление учениками
              </button>
            </div>
          );
        })}
        {groups.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-400">
            <Users size={40} className="mx-auto mb-3 opacity-40" />
            <p>Групп нет. Создайте первую!</p>
          </div>
        )}
      </div>

      {(action === 'CREATE' || action === 'EDIT') && (
        <GroupForm action={action} closeModal={closeModal} />
      )}
      {action === 'VIEW' && selectedGroupId && (
        <GroupDetailCard groupId={selectedGroupId} closeModal={closeModal} />
      )}
    </div>
  );
}
