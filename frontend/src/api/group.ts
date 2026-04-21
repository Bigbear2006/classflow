import type { Group } from '../types.ts';

export const getGroups = (): Promise<Group[]> => {
  return Promise.resolve([
    {
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
      name: 'Группа',
      maxUsersCount: 15,
      createdAt: new Date(),
      students: [],
    },
  ]);
};

export const getGroup = (id: number): Promise<Group> => {
  return Promise.resolve({
    id: id,
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
    name: 'Группа',
    maxUsersCount: 15,
    createdAt: new Date(),
    students: [],
  });
};

export const deleteGroup = (id: number) => {
  return Promise.resolve(() => console.log(id));
};
