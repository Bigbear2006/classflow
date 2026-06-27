import { createFileRoute } from '@tanstack/react-router';
import { NotificationsPage } from '../../pages/NotificationsPage.tsx';
import { createLoader } from '../../loaders.ts';

export const Route = createFileRoute('/_layout/notifications')({
  component: NotificationsPage,
  loader: createLoader({ requireUser: true }),
  ssr: false,
});
