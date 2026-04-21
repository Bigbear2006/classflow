import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type {
  CoursePaymentType,
  LessonType,
  ModalAction,
} from '../../../types.ts';

interface CourseFormProps {
  action: ModalAction;
  closeModal: () => void;
}

interface CreateCourseFields {
  subjectId: number;
  type: CoursePaymentType;
  price: number;
  paymentType: CoursePaymentType;
  lessonType: LessonType;
  lessonDuration: number;
  lessonsCount?: number;
  duration?: number;
}

export const CourseForm = ({ action, closeModal }: CourseFormProps) => {
  const { register, handleSubmit } = useForm<CreateCourseFields>();

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">
            {action === 'CREATE' ? 'Новый курс' : 'Редактировать курс'}
          </h2>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit(console.log)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Предмет
            </label>
            <input
              {...register('subjectId')}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Описание
            </label>
            <input
              {...register('type')}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Оплата
            </label>
            <input
              {...register('paymentType')}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Цена (₽)
              </label>
              <input
                {...register('price')}
                type="number"
                min="0"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Длительность урока (мин)
              </label>
              <input
                {...register('lessonDuration')}
                type="number"
                min="15"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Формат
              </label>
              <select
                {...register('lessonType')}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="OFFLINE">Офлайн</option>
                <option value="ONLINE">Онлайн</option>
                <option value="MIXED">Смешанный</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Оплата
              </label>
              <select
                {...register('duration')}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="EVERY_LESSON">За каждое занятие</option>
                <option value="FULL_COURSE">За весь курс</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Кол-во занятий в курсе
            </label>
            <input
              {...register('lessonsCount')}
              type="number"
              min="1"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
            >
              {action === 'CREATE' ? 'Создать' : 'Сохранить'}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
