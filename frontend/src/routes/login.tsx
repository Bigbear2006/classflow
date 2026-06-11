import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '../pages/LoginPage.tsx';
import { createLoader } from '../loaders.ts';

export const Route = createFileRoute('/login')({
  component: LoginPage,
  loader: createLoader(),
});
