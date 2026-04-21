import type { Lesson } from '../types.ts';

export const getUpcomingLessons = (): Promise<Lesson[]> => {
  return Promise.resolve([
    {
      id: 1,
      group: {
        id: 1,
        courseId: 1,
        course: {
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
        name: '',
        defaultCabinetId: null,
        maxUsersCount: 15,
        createdAt: new Date(),
        students: [],
      },
      studentTeacherCourse: null,
      cabinetId: 1,
      cabinet: {
        id: 1,
        number: '101',
      },
      conductedById: 1,
      conductedBy: {
        id: 0,
        fullname: 'aaaaa',
        email: '',
        phone: '',
        password: '',
        createdAt: '',
      },
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
  ]);
};

export const deleteLesson = (id: number) => {
  return Promise.resolve(() => console.log(id));
};
