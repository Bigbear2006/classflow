import type { CoursePaymentType } from './types.ts';

export const navigateToOrganization = (slug: string) => {
  let host = window.location.host;
  if (host.includes('.')) {
    let parts = window.location.host.split('.', 2);
    host = parts[1];
  }
  console.log(host);
  window.location.href = `${window.location.protocol}//${slug}.${host}${window.location.pathname}`;
};

export const coursePaymentTypeDisplay = (paymentType: CoursePaymentType): string => {
  return paymentType == 'EVERY_LESSON' ? 'за занятие' : 'за курс';
};
