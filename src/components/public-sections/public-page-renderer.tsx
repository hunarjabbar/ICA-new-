import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CompositionPage } from './composition-page';

interface PublicPageRendererProps {
  routeKey?: string;
  slug: string;
  children?: React.ReactNode;
}

export function PublicPageRenderer({
  routeKey: _routeKey,
  slug,
  children,
}: PublicPageRendererProps) {
  const queryClient = useQueryClient();

  const { data: pageData, isLoading, refetch } = useQuery({
    queryKey: ['public-composition-page', slug],
    queryFn: async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      try {
        const res = await fetch(`/api/hub/composition/pages/${slug}`, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to load page');
        return await res.json();
      } finally {
        clearTimeout(timeoutId);
      }
    },
    staleTime: 10000,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    const handleSync = () => {
      queryClient.invalidateQueries({ queryKey: ['public-composition-page', slug] });
      refetch();
    };

    window.addEventListener('composition-updated', handleSync);
    return () => window.removeEventListener('composition-updated', handleSync);
  }, [queryClient, slug, refetch]);

  if (isLoading && !pageData) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-neutral-600 font-medium text-xs font-mono uppercase tracking-widest">
          Synchronizing Sovereign Composition Engine...
        </p>
      </div>
    );
  }

  if (!pageData || !pageData.sections || pageData.sections.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-neutral-500 font-medium text-sm">No composition sections configured.</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors shadow-xs cursor-pointer"
        >
          Retry Synchronization
        </button>
        {children}
      </div>
    );
  }

  return <CompositionPage page={pageData} sections={pageData.sections} onSync={() => refetch()} />;
}

