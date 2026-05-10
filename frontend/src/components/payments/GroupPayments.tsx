import type { GroupWithPayments, PaymentMeta } from '../../entities';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';
import { FullCoursePayments } from './FullCoursePayments.tsx';
import { EveryLessonPayments } from './EveryLessonPayments.tsx';

interface GroupPaymentsProps {
  group: GroupWithPayments;
  openGroupPay: (studentGroupId: number) => void;
  openIndividualPay: (paymentMeta: PaymentMeta) => void;
}

export const GroupPayments = ({ group, openGroupPay, openIndividualPay }: GroupPaymentsProps) => {
  const [expandedGroups, setExpandedGroups] = useState<number[]>([]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <button
        onClick={() =>
          setExpandedGroups(groups =>
            groups.includes(group.id)
              ? groups.filter(groupId => groupId !== group.id)
              : [...groups, group.id],
          )
        }
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
            <Users size={18} className="text-indigo-600" />
          </div>
          <div>
            <div className="font-medium text-slate-900">{group.name}</div>
            <div className="text-xs text-slate-500">
              {group.name} · {group.students.length} учеников
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-semibold text-slate-900">
              {group.totalPaid.toLocaleString('ru')} ₽
            </div>
            {group.course.price && (
              <div className="text-xs text-slate-400">
                из {group.course.price.toLocaleString('ru')} ₽
              </div>
            )}
          </div>
          {expandedGroups.includes(group.id) ? (
            <ChevronUp size={16} className="text-slate-400" />
          ) : (
            <ChevronDown size={16} className="text-slate-400" />
          )}
        </div>
      </button>

      {expandedGroups.includes(group.id) && (
        <div className="border-t border-slate-100">
          {group.course.paymentType === 'FULL_COURSE' ? (
            <div className="divide-y divide-slate-50">
              {group.students.map(student => (
                <FullCoursePayments
                  group={group}
                  studentGroup={student}
                  openGroupPay={openGroupPay}
                />
              ))}
            </div>
          ) : (
            <div className="p-5">
              <div className="space-y-3">
                {group.students.map(student => (
                  <EveryLessonPayments
                    group={group}
                    studentGroup={student}
                    openIndividualPay={openIndividualPay}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
