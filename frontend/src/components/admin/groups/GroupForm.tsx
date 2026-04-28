import { X } from 'lucide-react';
import type { GroupDetail, ModalAction } from '../../../types.ts';
import { type OutputGroupFields, useGroupForm } from '../../../hooks/forms/group.ts';
import { useCourses } from '../../../hooks/queries/course.ts';
import { useCabinets } from '../../../hooks/queries/cabinet.ts';
import { useGroupMutation } from '../../../hooks/mutations/group.ts';

interface GroupFormProps {
  action: ModalAction;
  group?: GroupDetail;
  closeModal: () => void;
}

export const GroupForm = ({ action, group, closeModal }: GroupFormProps) => {
  const { register, handleSubmit } = useGroupForm({ initialValues: group });

  const { data: courses } = useCourses();
  const { data: cabinets } = useCabinets();
  const mutation = useGroupMutation({
    action: action,
    groupId: group?.id,
    closeModal: closeModal,
  });

  const onSubmit = (data: OutputGroupFields) =>
    mutation.mutate({
      name: data.name,
      course_id: data.courseId,
      max_users_count: data.maxUsersCount,
      default_cabinet_id: data.defaultCabinetId !== 0 ? data.defaultCabinetId : undefined,
    });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <div className="bg-white rounded-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">
            {action === 'CREATE' ? 'Новая группа' : 'Редактировать группу'}
          </h2>
          <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Курс</label>
            <select
              {...register('courseId')}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Выберите курс</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.subject.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Название группы
            </label>
            <input
              {...register('name')}
              placeholder="Математика — Группа А"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Кабинет по умолчанию
            </label>
            <select
              {...register('defaultCabinetId')}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Не указан</option>
              {cabinets.map(c => (
                <option key={c.id} value={c.id}>
                  {c.number}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Максимум учеников
            </label>
            <input
              {...register('maxUsersCount')}
              type="number"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium"
            >
              {action === 'CREATE' ? 'Создать' : 'Сохранить'}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
