import { createFileRoute } from '@tanstack/react-router';
import { GroupsPage } from '../../pages/GroupsPage.tsx';
import { createLoader } from '../../loaders.ts';

export const Route = createFileRoute('/_layout/groups')({
  component: GroupsPage,
  loader: createLoader({
    requireUser: true,
    requireOrganization: true,
    requireMember: true,
  }),
  ssr: false,
});
