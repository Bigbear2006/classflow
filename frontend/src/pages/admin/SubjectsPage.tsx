import { BookOpen, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { FormAction, Subject } from '../../types.ts';
import { getSubjects } from '../../api/subject.ts';
import { SubjectForm } from '../../components/admin/subjects/SubjectForm.tsx';
import { SubjectCard } from '../../components/admin/subjects/SubjectCard.tsx';

export const SubjectsPage = () => {
  const [action, setAction] = useState<FormAction | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const closeModal = () => setAction(null);

  const refreshSubjects = () => {
    getSubjects().then(setSubjects);
  };

  useEffect(() => refreshSubjects(), []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 text-2xl font-semibold">Предметы</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {subjects.length} предметов в организации
          </p>
        </div>
        <button
          onClick={() => setAction('CREATE')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Добавить предмет
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {subjects.map(subject => (
          <SubjectCard
            subject={subject}
            setAction={setAction}
            refreshSubjects={refreshSubjects}
          />
        ))}
        {subjects.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-400">
            <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
            <p>Предметов ещё нет. Создайте первый!</p>
          </div>
        )}
      </div>

      {(action === 'CREATE' || action === 'EDIT') && (
        <SubjectForm
          action={action}
          closeModal={closeModal}
          refreshSubjects={refreshSubjects}
        />
      )}
    </div>
  );
};
