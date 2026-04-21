import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import { AppContextProvider } from './context.tsx';

export default function App() {
  return (
    <>
      <Toaster position="top-center" richColors={true} />
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </>
  );
}
