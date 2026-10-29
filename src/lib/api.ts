import { useAuthStore } from '../store/useAuthStore';

export async function apiFetch(url: string, options: RequestInit = {}) {
  const { user } = useAuthStore.getState();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (user?.role) headers['x-role'] = user.role.toUpperCase();
  if (user?.email) headers['x-user-email'] = user.email;

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });
  
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      // Optional: Handle unauthorized
    }
  }
  return res;
}

export async function publishLiveUpdate(data: any) {
  try {
    const payload = {
      ...data,
      contentCk: data.contentCk || data.contentCkb || '',
      contentCkb: data.contentCkb || data.contentCk || '',
    };
    const res = await apiFetch(`/api/hub/live/${data.eventId}/updates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
      // Fallback to /api/updates if event route fails
      const fallbackRes = await apiFetch('/api/updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!fallbackRes.ok) {
        let errorMsg = 'Failed to publish';
        try {
          const errorData = await fallbackRes.json();
          errorMsg = errorData.error || errorMsg;
        } catch {}
        return { success: false, error: errorMsg };
      }

      const result = await fallbackRes.json();
      return { success: true, data: result };
    }
    
    const result = await res.json();
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
