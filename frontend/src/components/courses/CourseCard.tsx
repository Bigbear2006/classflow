import { Edit2, Trash2 } from 'lucide-react';
import { displayCoursePaymentType, paymentTypeLabels } from '../../labels/course.tsx';
import type { CourseDetail } from '../../entities';
import { useAppContext } from '../../context.tsx';
import { lessonTypeLabels, studentStatusConfig } from '../../labels/lesson.tsx';
import { useState } from 'react';
import { SelectCourseTeacher } from './SelectCourseTeacher.tsx';
import { ConfirmAddToCourse } from './ConfirmAddToCourse.tsx';
import { useDeleteCourseMutation } from '../../hooks/mutations/course.ts';
import { useConfirm } from '../../hooks/useConfirm.ts';

interface CourseCardProps {
  course: CourseDetail;
  openDetail: (course: CourseDetail) => void;
  openEdit: (course: CourseDetail) => void;
}

type ConfirmAction = 'SELECT_TEACHER' | 'CONFIRM';

export const CourseCard = ({ course, openDetail, openEdit }: CourseCardProps) => {
  const { user, isStudent, isAdminOrOwner } = useAppContext();
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);
  const closeModal = () => setConfirmAction(null);

  const deleteCourseMutation = useDeleteCourseMutation();
  const handleDeleteCourse = useConfirm({
    message: `Удалить курс ${course.subject.name}?`,
    action: deleteCourseMutation.mutate,
    actionLabel: 'Удалить',
  });

  return (
    <div
      key={course.id}
      onClick={isAdminOrOwner ? () => openDetail(course) : undefined}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="h-36 overflow-hidden cursor-pointer">
        <img
          src={course.subject.image}
          alt={course.subject.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="font-semibold text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors"
            onClick={() => openDetail(course)}
          >
            {course.subject.name}
          </h3>
          {isAdminOrOwner && (
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={e => {
                  e.stopPropagation();
                  openEdit(course);
                }}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleDeleteCourse(course.id);
                }}
                className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
        <p className="text-slate-500 text-xs line-clamp-2 mb-3">{course.subject.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-lg text-xs">
            {lessonTypeLabels[course.lessonType]}
          </span>
          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs">
            {paymentTypeLabels[course.paymentType]}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center border-t border-slate-100 pt-3 pb-3">
          <div>
            <div className="text-slate-900 font-semibold text-sm">
              {course.price.toLocaleString('ru')} ₽
            </div>
            <div className="text-slate-400 text-xs">
              {displayCoursePaymentType(course.paymentType)}
            </div>
          </div>
          <div>
            <div className="text-slate-900 font-semibold text-sm">{course.teachersCount}</div>
            <div className="text-slate-400 text-xs">препод.</div>
          </div>
          <div>
            <div className="text-slate-900 font-semibold text-sm">{course.studentsCount}</div>
            <div className="text-slate-400 text-xs">учеников</div>
          </div>
        </div>
        {user &&
          isStudent &&
          !course.studentStatus &&
          ((course.type === 'INDIVIDUAL' && course.teachersCount !== 0) ||
            course.activeGroupId) && (
            <button
              onClick={() =>
                setConfirmAction(course.type === 'INDIVIDUAL' ? 'SELECT_TEACHER' : 'CONFIRM')
              }
              className="flex-1 py-2.5 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
            >
              Записаться
            </button>
          )}
        {course.studentStatus && (
          <div
            className={`flex-1 py-2.5 w-full ${studentStatusConfig[course.studentStatus].color} text-white rounded-xl text-sm font-medium`}
          >
            <p className="text-center">{studentStatusConfig[course.studentStatus].label}</p>
          </div>
        )}
      </div>
      {confirmAction == 'SELECT_TEACHER' && (
        <SelectCourseTeacher courseId={course.id} closeModal={closeModal} />
      )}
      {confirmAction == 'CONFIRM' && (
        <ConfirmAddToCourse course={course} closeModal={closeModal} />
      )}
    </div>
  );
};
