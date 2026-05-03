import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { LessonDetail, OrganizationMemberDetail, Payment } from '../entities';

export default function NotificationsPage() {
  const [upcomingLessons, setUpcomingLessons] = useState<LessonDetail[]>([]);
  const [recentPayments, setRecentPayments] = useState<Payment[]>([]);
  const [recentMembers, setRecentMembers] = useState<OrganizationMemberDetail[]>([]);

  useEffect(() => {
    setUpcomingLessons([]);
    setRecentPayments([]);
    setRecentMembers([]);
  }, []);

  const hasActivity =
    upcomingLessons.length > 0 || recentPayments.length > 0 || recentMembers.length > 0;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-slate-900 text-2xl font-semibold">Уведомления</h1>
        <p className="text-slate-500 text-sm mt-0.5">Активность и события за последнее время</p>
      </div>
      {!hasActivity && (
        <div className="text-center py-20 text-slate-400">
          <Bell size={48} className="mx-auto mb-3 opacity-30" />
          <p>Нет активности</p>
          <p className="text-sm mt-1">Здесь появятся уведомления о занятиях и платежах</p>
        </div>
      )}
    </div>
  );
}
