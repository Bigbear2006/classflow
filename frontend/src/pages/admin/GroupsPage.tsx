import { useState } from 'react';
import type { GroupDetail, ModalAction } from '../../types.ts';
import { Users, Plus } from 'lucide-react';
import { GroupDetailCard } from '../../components/admin/groups/GroupDetailCard.tsx';
import { GroupForm } from '../../components/admin/groups/GroupForm.tsx';
import { GroupCard } from '../../components/admin/groups/GroupCard.tsx';
import { useCourses } from '../../hooks/queries/course.ts';
import { useGroups } from '../../hooks/queries/group.ts';

export default function GroupsPage() {
  const { data: courses } = useCourses();
  const { data: groups } = useGroups();

  const [action, setAction] = useState<ModalAction | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<GroupDetail>();

  const openEdit = (group: GroupDetail) => {
    setSelectedGroup(group);
    setAction('EDIT');
  };

  const openDetail = (group: GroupDetail) => {
    setSelectedGroup(group);
    setAction('VIEW');
  };

  const closeModal = () => {
    setSelectedGroup(undefined);
    setAction(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 text-2xl font-semibold">Группы</h1>
          <p className="text-slate-500 text-sm mt-0.5">Управление учебными группами</p>
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
        {groups.map(group => (
          <GroupCard key={group.id} group={group} openDetail={openDetail} openEdit={openEdit} />
        ))}
        {groups.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-400">
            <Users size={40} className="mx-auto mb-3 opacity-40" />
            <p>Групп нет. Создайте первую!</p>
          </div>
        )}
      </div>

      {(action === 'CREATE' || action === 'EDIT') && (
        <GroupForm action={action} group={selectedGroup} closeModal={closeModal} />
      )}
      {action === 'VIEW' && selectedGroup && (
        <GroupDetailCard group={selectedGroup} closeModal={closeModal} />
      )}
    </div>
  );
}
