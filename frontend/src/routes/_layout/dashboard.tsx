import { createFileRoute } from '@tanstack/react-router';
import { DashboardPage } from '../../pages/DashboardPage.tsx';
import { createLoader } from '../../loaders.ts';

export const Route = createFileRoute('/_layout/dashboard')({
  component: DashboardPage,
  loader: createLoader({
    requireUser: true,
    requireOrganization: true,
    requireMember: true,
  }),
});
