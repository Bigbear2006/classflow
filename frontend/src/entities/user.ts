import type { Payment } from './payment.ts';

export interface User {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
  avatar?: string;
}

export interface UserWithPayment extends User {
  totalPaid: number;
  payments: Payment[];
}
