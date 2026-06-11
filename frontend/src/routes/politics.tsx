import { createFileRoute } from '@tanstack/react-router';
import { PoliticsPage } from '../pages/PoliticsPage.tsx';

export const Route = createFileRoute('/politics')({
  component: PoliticsPage,
});
