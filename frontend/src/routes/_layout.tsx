import { createFileRoute } from '@tanstack/react-router';
import { AppLayout } from '../components/layout/AppLayout.tsx';

export const Route = createFileRoute('/_layout')({
  component: AppLayout,
});
