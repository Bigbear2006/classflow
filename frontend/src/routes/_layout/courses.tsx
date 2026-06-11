import { createFileRoute } from '@tanstack/react-router';
import { CoursesPage } from '../../pages/CoursesPage.tsx';
import { createLoader } from '../../loaders.ts';

export const Route = createFileRoute('/_layout/courses')({
  component: CoursesPage,
  loader: createLoader({ requireOrganization: true }),
});
