import { createFileRoute } from '@tanstack/react-router';
import { RegisterPage } from '../pages/RegisterPage.tsx';
import { z } from 'zod';

const RegisterRouteSearch = z.object({
  verificationToken: z.string().optional().catch(undefined),
});

export const Route = createFileRoute('/register')({
  component: RegisterPage,
  validateSearch: RegisterRouteSearch,
  ssr: false,
});
