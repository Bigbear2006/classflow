import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import { AppContextProvider } from './context.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

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
