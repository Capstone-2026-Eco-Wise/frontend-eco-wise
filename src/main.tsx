import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Toaster } from './components/ui/sonner';
import { SessionProvider } from '@/features/auth/context/SessionContext';
import { ThemeProvider } from 'next-themes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <App />
          <Toaster
            position="top-right"
            duration={5000}
            richColors
          />
        </ThemeProvider>
      </SessionProvider>
    </BrowserRouter>
  </StrictMode>,
);
