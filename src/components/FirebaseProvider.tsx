import React, { useEffect, useState } from 'react';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'sonner';

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;

    async function testConnection(attempt = 1) {
      try {
        // Validate connection to Firestore on boot (per Firebase skill guidelines)
        // Use getDocFromServer to bypass local cache and verify actual backend reachability
        await getDocFromServer(doc(db, 'test', 'connection'));
        
        if (isMounted) {
          console.log('✅ Firebase connection established on attempt', attempt);
          setIsFirebaseReady(true);
          setConnectionError(null);
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.warn(`⚠️ Firebase connection attempt ${attempt} failed:`, errorMsg);

        if (attempt < 3) {
          retryTimeout = setTimeout(() => {
            if (isMounted) {
              testConnection(attempt + 1);
            }
          }, attempt * 1500);
        } else {
          if (isMounted) {
            setConnectionError(errorMsg);
            // Graceful degradation: client operates with local/offline caching without crashing
            setIsFirebaseReady(true); 
            
            if (errorMsg.includes('unavailable')) {
              toast.error('Firestore connection unavailable. Operating in offline mode.', {
                description: 'Verify your internet connection or Firebase configuration.',
                duration: 10000
              });
            }
          }
        }
      }
    }

    testConnection();

    return () => {
      isMounted = false;
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, []);

  // Provide a diagnostic context if needed, but for now just pass through
  return (
    <div data-firebase-ready={isFirebaseReady} data-firebase-error={!!connectionError}>
      {children}
    </div>
  );
}
