import { createFileRoute } from '@tanstack/react-router';
import { AttendancePage } from '../../pages/student/AttendancePage.tsx';
import { createLoader } from '../../loaders.ts';

export const Route = createFileRoute('/_layout/attendance')({
  component: AttendancePage,
  loader: createLoader({
    requireUser: true,
    requireOrganization: true,
    requireMember: true,
  }),
});
