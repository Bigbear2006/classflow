import { createFileRoute } from '@tanstack/react-router';
import { AddressesPage } from '../../pages/admin/AddressesPage.tsx';
import { createLoader } from '../../loaders.ts';

export const Route = createFileRoute('/_layout/addresses')({
  component: AddressesPage,
  loader: createLoader({
    requireUser: true,
    requireOrganization: true,
    requireMember: true,
  }),
  ssr: false,
});
