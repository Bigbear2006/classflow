import type { Course, CourseDetail } from '../types.ts';

export const getCourses = (): Promise<Course[]> => {
  return Promise.resolve([
    {
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
  ]);
};

export const getCourse = (id: number): Promise<CourseDetail> => {
  return Promise.resolve({
    id: id,
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
    groups: [],
    teachers: [],
  });
};

export const deleteCourse = (id: number) => {
  return Promise.resolve(() => console.log(id));
};
