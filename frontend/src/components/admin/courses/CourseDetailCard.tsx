import { Clock, DollarSign, UserCheck, Users, X } from 'lucide-react';
import { coursePaymentTypeDisplay } from '../../../utils.ts';
import type { Course } from '../../../types.ts';
import { useAppContext } from '../../../context.tsx';
import { useCourseGroups, useCourseTeachers } from '../../../hooks/queries/course.ts';

interface CourseDetailCardProps {
  course: Course;
  closeModal: () => void;
}

export const CourseDetailCard = ({ course, closeModal }: CourseDetailCardProps) => {
  const { isAdminOrOwner } = useAppContext();
  const { data: groups } = useCourseGroups({ courseId: course.id });
  const { data: teachers } = useCourseTeachers({ courseId: course.id });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">{course.subject.name}</h2>
          <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        <div className="p-6 space-y-5">
          {course.subject.image && (
            <img
              src={course.subject.image}
              alt=""
              className="w-full h-40 object-cover rounded-xl"
            />
          )}
          <p className="text-slate-600 text-sm">{course.subject.description}</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-xl p-3 text-center">
              <DollarSign size={16} className="mx-auto text-slate-400 mb-1" />
              <div className="font-semibold">{course.price.toLocaleString('ru')} ₽</div>
              <div className="text-xs text-slate-400">
                {coursePaymentTypeDisplay(course.paymentType)}
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 text-center">
              <Clock size={16} className="mx-auto text-slate-400 mb-1" />
              <div className="font-semibold">{course.duration?.as('minutes')} мин</div>
              <div className="text-xs text-slate-400">длительность</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 text-center">
              <Users size={16} className="mx-auto text-slate-400 mb-1" />
              <div className="font-semibold">{groups.length}</div>
              <div className="text-xs text-slate-400">групп</div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-slate-900 flex items-center gap-2">
                <UserCheck size={16} /> Преподаватели
              </h3>
              {isAdminOrOwner && (
                <select
                  // onChange={e => {
                  //   if (e.target.value) {
                  //     addCourseTeacher(
                  //       course.id.toString(),
                  //       e.target.value,
                  //     );
                  //     e.target.value = '';
                  //   }
                  // }}
                  className="text-xs px-2 py-1.5 border border-slate-200 rounded-lg focus:outline-none"
                >
                  <option value="">+ Добавить</option>
                  {/*TODO: add teachers search*/}
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.fullname}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="space-y-2">
              {teachers.map(teacher => (
                <div
                  key={teacher.id}
                  className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-medium">
                      {teacher.avatar ? (
                        <img
                          src={teacher.avatar}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover"
                        />
                      ) : (
                        teacher.fullname.charAt(0)
                      )}
                    </div>
                    <span className="text-sm text-slate-800">{teacher.fullname}</span>
                  </div>
                  <button
                    onClick={() => () => {}}
                    className="text-slate-400 hover:text-red-500 p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {teachers.length === 0 && (
                <p className="text-sm text-slate-400">Преподаватели не назначены</p>
              )}
            </div>
          </div>

          {isAdminOrOwner && (
            <div>
              <h3 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                <Users size={16} /> Группы
              </h3>
              <div className="space-y-2">
                {groups.map(g => (
                  <div
                    key={g.id}
                    className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl"
                  >
                    <span className="text-sm text-slate-800">{g.name}</span>
                    // TODO: add
                    {/*<span className="text-xs text-slate-500">*/}
                    {/*  {g.studentsCount || 0}/{g.maxUsersCount} уч.*/}
                    {/*</span>*/}
                  </div>
                ))}
                {groups.length === 0 && <p className="text-sm text-slate-400">Групп нет</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
