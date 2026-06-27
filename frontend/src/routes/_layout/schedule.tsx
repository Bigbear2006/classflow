import { createFileRoute } from '@tanstack/react-router';
import { SchedulePage } from '../../pages/SchedulePage.tsx';
import { createLoader } from '../../loaders.ts';

export const Route = createFileRoute('/_layout/schedule')({
  component: SchedulePage,
  loader: createLoader({
    requireUser: true,
    requireOrganization: true,
    requireMember: true,
  }),
  ssr: false,
});
