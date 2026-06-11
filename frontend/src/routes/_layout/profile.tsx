import { createFileRoute } from '@tanstack/react-router';
import { ProfilePage } from '../../pages/ProfilePage.tsx';
import { createLoader } from '../../loaders.ts';

export const Route = createFileRoute('/_layout/profile')({
  component: ProfilePage,
  loader: createLoader({ requireUser: true }),
});
