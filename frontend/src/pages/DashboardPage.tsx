import { OrganizationStatsBlock } from '../components/admin/dashboard/OrganizationStatsBlock.tsx';
import { QuickActions } from '../components/admin/dashboard/QuickActions.tsx';
import { UpcomingLessons } from '../components/common/UpcomingLessons.tsx';
import { OrganizationHeader } from '../components/common/OrganizationHeader.tsx';
import { useAppContext } from '../context.tsx';
import { TeacherStatsBlock } from '../components/teacher/TeacherStatsBlock.tsx';
import { StudentStatsBlock } from '../components/student/StudentStatsBlock.tsx';
import { MyCourses } from '../components/common/MyCourses.tsx';
import { Loading } from '../components/common/Loading.tsx';
import { OrganizationsPage } from './OrganizationsPage.tsx';

export default function DashboardPage() {
  const { member, isLoading } = useAppContext();
  const isAdmin = member.role == 'ADMIN' || member.role == 'OWNER';

  if (window.location.host.split('.').length <= 2) {
    return <OrganizationsPage />;
  }

  return (
    <div className="p-6 space-y-6">
      {isLoading && <Loading />}
      <OrganizationHeader />
      {isAdmin && <OrganizationStatsBlock />}
      {member.role == 'TEACHER' && <TeacherStatsBlock />}
      {member.role == 'STUDENT' && <StudentStatsBlock />}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingLessons />
        {isAdmin ? <QuickActions /> : <MyCourses />}
      </div>
    </div>
  );
}
