import { createFileRoute } from '@tanstack/react-router';
import { OrganizationMembersPage } from '../../pages/admin/OrganizationMembersPage.tsx';
import { createLoader } from '../../loaders.ts';
import { z } from 'zod';

const OrganizationMembersRouterSearch = z.object({
  q: z.string().optional().catch(undefined),
  role: z.string().optional().catch(undefined),
});

export const Route = createFileRoute('/_layout/members')({
  component: OrganizationMembersPage,
  loader: createLoader({
    requireUser: true,
    requireOrganization: true,
    requireMember: true,
  }),
  validateSearch: OrganizationMembersRouterSearch,
});
