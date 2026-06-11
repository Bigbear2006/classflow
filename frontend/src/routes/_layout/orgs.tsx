import { createFileRoute } from '@tanstack/react-router';
import { OrganizationsPage } from '../../pages/OrganizationsPage.tsx';
import { createLoader } from '../../loaders.ts';
import { z } from 'zod';

const OrgsRouteSearch = z.object({
  q: z.string().optional().catch(undefined),
});

export const Route = createFileRoute('/_layout/orgs')({
  component: OrganizationsPage,
  loader: createLoader({ requireUser: true }),
  validateSearch: OrgsRouteSearch,
});
