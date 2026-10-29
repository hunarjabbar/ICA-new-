/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useAuthStore } from './store/useAuthStore';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeApplier } from './components/ThemeApplier';
import { DevBuildInfoBadge } from './components/DevBuildInfoBadge';
import { router } from './routes';

export { resolveLocaleFromEnvironment } from './routes/languageSetup';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <ErrorBoundary lang="en">
      <QueryClientProvider client={queryClient}>
        <ThemeApplier />
        {process.env.NODE_ENV === 'development' && <DevBuildInfoBadge />}
        <Toaster
          position="top-right"
          richColors
          closeButton
          theme="system"
          toastOptions={{
            style: {
              borderRadius: '12px',
              fontFamily: 'inherit',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }}
        />
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
