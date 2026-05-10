import { OrganizationStatsBlock } from '../components/dashboard/OrganizationStatsBlock.tsx';
import { QuickActions } from '../components/dashboard/QuickActions.tsx';
import { UpcomingLessons } from '../components/common/UpcomingLessons.tsx';
import { OrganizationHeader } from '../components/common/OrganizationHeader.tsx';
import { useAppContext } from '../context.tsx';
import { TeacherStatsBlock } from '../components/teacher/dashboard/TeacherStatsBlock.tsx';
import { StudentStatsBlock } from '../components/student/dashboard/StudentStatsBlock.tsx';
import { MyCourses } from '../components/common/MyCourses.tsx';

export const DashboardPage = () => {
  const { isStudent, isTeacher, isAdminOrOwner } = useAppContext();

  return (
    <div className="p-6 space-y-6">
      <OrganizationHeader />
      {isStudent && <StudentStatsBlock />}
      {isTeacher && <TeacherStatsBlock />}
      {isAdminOrOwner && <OrganizationStatsBlock />}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingLessons />
        {isAdminOrOwner ? <QuickActions /> : <MyCourses />}
      </div>
    </div>
  );
};
