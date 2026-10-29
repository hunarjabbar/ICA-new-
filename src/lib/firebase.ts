import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, setLogLevel } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Log config for diagnostic purposes (safe in this controlled environment)
console.log('🔥 Initializing Firebase for Project:', firebaseConfig.projectId);
console.log('📡 Targeting Firestore Database:', firebaseConfig.firestoreDatabaseId);

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Standard getFirestore initialization matching the Firebase skill specification
// The app will fail with [code=unavailable] if this databaseId does not match the provisioned resource
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);

// Set log level to error by default, but allow manual overrides via localStorage for debugging
try {
  if (typeof window !== 'undefined' && window.localStorage.getItem('FIREBASE_DEBUG') === 'true') {
    setLogLevel('debug');
  } else {
    setLogLevel('error');
  }
} catch {}

// Error Handling Infrastructure (Section 3 of Firebase Skill)
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  
  // Conform to JSON logging requirement for system diagnostics
  console.error('Firestore Error Payload: ', JSON.stringify(errInfo));
  
  // If connection is unavailable, it often means the project/database mapping is wrong or terms not accepted
  if (errInfo.error.includes('unavailable')) {
    console.error('CRITICAL: Firestore backend unreachable. Verify ProvisionFirebase RPC was successful and terms are accepted.');
  }

  throw new Error(JSON.stringify(errInfo));
}
