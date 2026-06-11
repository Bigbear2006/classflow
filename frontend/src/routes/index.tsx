import { createFileRoute } from '@tanstack/react-router';
import { LandingPage } from '../pages/LandingPage.tsx';
import { createLoader } from '../loaders.ts';

export const Route = createFileRoute('/')({
  component: LandingPage,
  loader: createLoader(),
});
