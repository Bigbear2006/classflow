import { Edit2, Trash2 } from 'lucide-react';
import type { FormAction, Subject } from '../../../types.ts';
import type { Dispatch, SetStateAction } from 'react';
import { useDeleteSubjectMutation } from '../../../hooks/mutations/subject.ts';

interface SubjectCardProps {
  subject: Subject;
  setSelectedSubject: Dispatch<SetStateAction<Subject | undefined>>;
  setAction: Dispatch<SetStateAction<FormAction | null>>;
}

export const SubjectCard = ({ subject, setSelectedSubject, setAction }: SubjectCardProps) => {
  const mutation = useDeleteSubjectMutation();

  return (
    <div
      key={subject.id}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      {subject.image && (
        <div className="h-36 overflow-hidden cursor-pointer">
          <img src={subject.image} alt={subject.name} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors">
            {subject.name}
          </h3>
          <div className="flex gap-1 flex-shrink-0">
            <button
              onClick={() => {
                setSelectedSubject(subject);
                setAction('EDIT');
              }}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={() => mutation.mutate(subject.id)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        <p className="text-slate-500 text-xs line-clamp-2 mb-3">{subject.description}</p>
      </div>
    </div>
  );
};
