import { createFileRoute } from '@tanstack/react-router';
import { PaymentsPage } from '../../pages/PaymentsPage.tsx';
import { createLoader } from '../../loaders.ts';

export const Route = createFileRoute('/_layout/payments')({
  component: PaymentsPage,
  loader: createLoader({
    requireUser: true,
    requireOrganization: true,
    requireMember: true,
  }),
  ssr: false,
});
