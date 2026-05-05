import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import { AppContextProvider } from './context.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './loaders.ts';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <Toaster position="top-center" richColors={true} />
        <RouterProvider router={router} />
      </AppContextProvider>
    </QueryClientProvider>
  );
}
