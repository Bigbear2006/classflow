import { createFileRoute } from '@tanstack/react-router';
import { FeedbackPage } from '../../pages/FeedbackPage.tsx';
import { createLoader } from '../../loaders.ts';

export const Route = createFileRoute('/_layout/feedback')({
  component: FeedbackPage,
  loader: createLoader({
    requireUser: true,
    requireOrganization: true,
    requireMember: true,
  }),
  ssr: false,
});
