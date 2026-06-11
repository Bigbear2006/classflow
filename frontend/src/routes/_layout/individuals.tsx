import { createFileRoute } from '@tanstack/react-router';
import { IndividualCoursesPage } from '../../pages/IndividualCoursesPage.tsx';
import { createLoader } from '../../loaders.ts';

export const Route = createFileRoute('/_layout/individuals')({
  component: IndividualCoursesPage,
  loader: createLoader({
    requireUser: true,
    requireOrganization: true,
    requireMember: true,
  }),
});
