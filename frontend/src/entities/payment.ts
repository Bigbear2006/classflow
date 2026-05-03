export interface Payment {
  id: number;
  amount: number;
  createdById: string;
  userGroupId: number | null;
  lessonId: number | null;
  date: string;
  comment: string;
}
