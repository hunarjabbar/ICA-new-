import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { 
  collection, 
  query, 
  onSnapshot, 
  DocumentData, 
  QueryConstraint,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  where,
  orderBy
} from 'firebase/firestore';

export function useCollection<T = DocumentData>(
  collectionPath: string,
  constraints: QueryConstraint[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const q = query(collection(db, collectionPath), ...constraints);
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as T[];
          setData(items);
          setLoading(false);
        },
        (err) => {
          handleFirestoreError(err, OperationType.LIST, collectionPath);
          setError(err as Error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, collectionPath);
    }
  }, [collectionPath, JSON.stringify(constraints.map(c => c.type))]); // Simple deps

  return { data, loading, error };
}

export function useDocument<T = DocumentData>(collectionPath: string, docId: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!docId) return;

    try {
      const docRef = doc(db, collectionPath, docId);
      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            setData({ id: docSnap.id, ...docSnap.data() } as T);
          } else {
            setData(null);
          }
          setLoading(false);
        },
        (err) => {
          handleFirestoreError(err, OperationType.GET, `${collectionPath}/${docId}`);
          setError(err as Error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `${collectionPath}/${docId}`);
    }
  }, [collectionPath, docId]);

  return { data, loading, error };
}

// Helper for direct Firestore operations
export const firestoreService = {
  async getCollection<T = DocumentData>(collectionPath: string, constraints: QueryConstraint[] = []) {
    try {
      const q = query(collection(db, collectionPath), ...constraints);
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, collectionPath);
      return [];
    }
  },

  async getDocument<T = DocumentData>(collectionPath: string, docId: string) {
    try {
      const docRef = doc(db, collectionPath, docId);
      const snap = await getDoc(docRef);
      if (snap.exists()) return { id: snap.id, ...snap.data() } as T;
      return null;
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `${collectionPath}/${docId}`);
      return null;
    }
  },

  async addDocument(collectionPath: string, data: any) {
    try {
      const docRef = await addDoc(collection(db, collectionPath), {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, collectionPath);
    }
  },

  async setDocument(collectionPath: string, docId: string, data: any) {
    try {
      await setDoc(doc(db, collectionPath, docId), {
        ...data,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `${collectionPath}/${docId}`);
    }
  },

  async updateDocument(collectionPath: string, docId: string, data: any) {
    try {
      await updateDoc(doc(db, collectionPath, docId), {
        ...data,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `${collectionPath}/${docId}`);
    }
  },

  async deleteDocument(collectionPath: string, docId: string) {
    try {
      await deleteDoc(doc(db, collectionPath, docId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `${collectionPath}/${docId}`);
    }
  }
};
