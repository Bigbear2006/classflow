import { OrganizationStatsBlock } from '../components/admin/dashboard/OrganizationStatsBlock.tsx';
import { QuickActions } from '../components/admin/dashboard/QuickActions.tsx';
import { UpcomingLessons } from '../components/common/UpcomingLessons.tsx';
import { OrganizationHeader } from '../components/common/OrganizationHeader.tsx';
import { useAppContext } from '../context.tsx';
import { TeacherStatsBlock } from '../components/teacher/TeacherStatsBlock.tsx';
import { StudentStatsBlock } from '../components/student/StudentStatsBlock.tsx';
import { MyCourses } from '../components/common/MyCourses.tsx';
import { Loading } from '../components/common/Loading.tsx';

export default function DashboardPage() {
  const { isStudent, isTeacher, isAdminOrOwner, isLoading } = useAppContext();

  return (
    <div className="p-6 space-y-6">
      {isLoading && <Loading />}
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
}
