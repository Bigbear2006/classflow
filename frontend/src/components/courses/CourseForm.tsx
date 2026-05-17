import type {
  CoursePaymentType,
  LessonType,
  CourseType,
  ModalAction,
  CourseDetail,
} from '../../entities';
import { Duration } from 'luxon';
import { type OutputCourseFields, useCourseForm } from '../../hooks/forms/course.ts';
import { useCourseMutation } from '../../hooks/mutations/course.ts';
import { useSubjects } from '../../hooks/queries/subject.ts';
import { FormField } from '../common/FormField.tsx';
import { CourseTypeField } from './CourseTypeField.tsx';
import { FormButtons } from '../common/FormButtons.tsx';
import { ModalHeader } from '../common/ModalHeader.tsx';
import { Modal } from '../common/Modal.tsx';
import { useEffect } from 'react';

interface CourseFormProps {
  action: ModalAction;
  course?: CourseDetail;
  closeModal: () => void;
}

export const CourseForm = ({ action, course, closeModal }: CourseFormProps) => {
  const { control, watch, setValue, handleSubmit } = useCourseForm({ initialValues: course });
  const courseType = watch('type');

  const mutation = useCourseMutation({
    action: action,
    courseId: course?.id,
    closeModal: closeModal,
  });
  const { data: subjects } = useSubjects();

  const onSubmit = (data: OutputCourseFields) =>
    mutation.mutate({
      subject_id: data.subjectId,
      type: data.type as CourseType,
      price: data.price,
      payment_type: data.paymentType as CoursePaymentType,
      lesson_type: data.lessonType as LessonType,
      lesson_duration: Duration.fromObject({
        minutes: data.lessonDuration,
      }).as('seconds'),
      lessons_count: data.lessonsCount,
      duration: Duration.fromObject({ months: data.duration }).as('seconds'),
    });

  useEffect(() => {
    if (courseType === 'INDIVIDUAL') {
      setValue('paymentType', 'EVERY_LESSON');
    }
  }, [courseType]);

  return (
    <Modal close={closeModal}>
      <ModalHeader
        title={action === 'CREATE' ? 'Новый курс' : 'Редактировать курс'}
        closeModal={closeModal}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
        <FormField
          name="subjectId"
          control={control}
          label="Предмет"
          required
          selectOptions={subjects.map(subject => ({ value: subject.id, label: subject.name }))}
        />
        <CourseTypeField control={control} />
        <FormField
          name="paymentType"
          control={control}
          label="Оплата"
          required
          disabled={courseType === 'INDIVIDUAL'}
          selectOptions={[
            { value: 'EVERY_LESSON', label: 'За каждое занятие' },
            { value: 'FULL_COURSE', label: 'За весь курс' },
          ]}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="price"
            control={control}
            label="Цена (₽)"
            placeholder="1000"
            required
            type="number"
          />
          <FormField
            name="lessonDuration"
            control={control}
            label="Длительность урока (мин)"
            placeholder="60"
            required
            type="number"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="lessonType"
            control={control}
            label="Формат"
            required
            selectOptions={[
              { value: 'OFFLINE', label: 'Офлайн' },
              { value: 'ONLINE', label: 'Онлайн' },
              { value: 'MIXED', label: 'Смешанный' },
            ]}
          />
          <FormField
            name="duration"
            control={control}
            label="Длительность курса (месяцев)"
            placeholder="3"
            type="number"
          />
        </div>
        <FormField
          name="lessonsCount"
          control={control}
          label="Количество занятий в курсе"
          placeholder="5"
          type="number"
        />
        <FormButtons
          submitButtonText={action === 'CREATE' ? 'Создать' : 'Сохранить'}
          submitButtonDisabled={mutation.isPending}
          onCancelButtonClick={closeModal}
        />
      </form>
    </Modal>
  );
};
