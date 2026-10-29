import React, { lazy } from 'react';

// Resilient lazy loading that retries on temporary network drops or dynamic chunk rebuilds
export function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T } | any>
) {
  return lazy(async () => {
    try {
      const mod = await factory();
      return mod.default ? mod : { default: mod };
    } catch (error: any) {
      console.warn('Initial chunk load error, attempting retry...', error);
      try {
        await new Promise((resolve) => setTimeout(resolve, 600));
        const mod = await factory();
        return mod.default ? mod : { default: mod };
      } catch (retryError: any) {
        console.warn('Second chunk attempt failed:', retryError);
        if (typeof window !== 'undefined') {
          const reloadKey = 'last_chunk_reload_timestamp';
          const lastReload = parseInt(window.sessionStorage.getItem(reloadKey) || '0', 10);
          const now = Date.now();
          // If we haven't reloaded within the last 10 seconds, force a reload to get latest manifest
          if (now - lastReload > 10000) {
            window.sessionStorage.setItem(reloadKey, now.toString());
            window.location.reload();
          }
          // Return a component that shows the error and allows manual refresh
          return {
            default: (() => (
              <div className="min-h-[50vh] flex items-center justify-center p-6 text-center">
                <div className="max-w-md p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-red-200 dark:border-neutral-800 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    System Update Detected
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 mb-4 leading-relaxed">
                    The application is reloading to apply the latest updates. Please wait a moment or refresh the page if this persists.
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    Force Refresh
                  </button>
                </div>
              </div>
            )) as unknown as T
          };
        }
        // Graceful non-crashing component fallback
        return {
          default: (() => (
            <div className="min-h-[50vh] flex items-center justify-center p-6 text-center">
              <div className="max-w-md p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-red-200 dark:border-neutral-800 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Content Updated
                </h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mb-4 leading-relaxed">
                  This section has been updated with the latest sovereign dispatches. Please refresh to view.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          )) as unknown as T
        };
      }
    }
  });
}
