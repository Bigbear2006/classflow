import { createFileRoute } from '@tanstack/react-router';
import { SubjectsPage } from '../../pages/admin/SubjectsPage.tsx';
import { createLoader } from '../../loaders.ts';

export const Route = createFileRoute('/_layout/subjects')({
  component: SubjectsPage,
  loader: createLoader({
    requireUser: true,
    requireOrganization: true,
    requireMember: true,
  }),
});
