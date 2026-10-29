import { create } from 'zustand';
import { 
  CiseCommandHubControlledSection, 
  CiseCommandHubControlledCard, 
  CustomizationModel, 
  StyleOverrides, 
  VisibilityState,
  HistoryRevision 
} from '../types/controlModel';
import { Locale } from '../types';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  getDocs,
  query,
  where,
  orderBy
} from 'firebase/firestore';

export interface SectionControlState {
  sections: Record<string, CiseCommandHubControlledSection>;
  activeFilter: 'all' | 'active' | 'draft' | 'archived';
  isLoading: boolean;
  isInitialized: boolean;
  
  // Section-level controls
  updateSectionCustomization: (sectionId: string, customization: Partial<CustomizationModel>) => Promise<void>;
  toggleSectionVisibility: (sectionId: string) => Promise<void>;
  
  // Card/Entity CRUD
  addCard: (sectionId: string, card: Omit<CiseCommandHubControlledCard, 'id' | 'createdAt' | 'updatedAt' | 'history'>) => Promise<CiseCommandHubControlledCard | null>;
  updateCard: (sectionId: string, cardId: string, updates: Partial<CiseCommandHubControlledCard>) => Promise<CiseCommandHubControlledCard | null>;
  duplicateCard: (sectionId: string, cardId: string) => Promise<CiseCommandHubControlledCard | null>;
  softDeleteCard: (sectionId: string, cardId: string) => Promise<boolean>;
  restoreCard: (sectionId: string, cardId: string) => Promise<boolean>;
  permanentDeleteCard: (sectionId: string, cardId: string) => Promise<boolean>;
  reorderCard: (sectionId: string, cardId: string, direction: 'up' | 'down') => Promise<void>;
  
  // Bulk Actions
  bulkUpdateStatus: (sectionId: string, cardIds: string[], status: 'active' | 'draft' | 'archived') => Promise<void>;
  bulkUpdateVisibility: (sectionId: string, cardIds: string[], visibility: VisibilityState) => Promise<void>;
  
  // Restyle & Style Overrides
  updateCardStyleOverrides: (sectionId: string, cardId: string, styles: StyleOverrides) => Promise<void>;
  
  // Sync
  initializeStore: () => () => void;
}

const DEFAULT_STYLE_OVERRIDES: StyleOverrides = {
  backgroundColor: null,
  textColor: null,
  borderColor: null,
  borderRadius: '16px',
  padding: '16px',
  margin: '0px',
  shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
};

export const useSectionControlStore = create<SectionControlState>((set, get) => ({
  sections: {},
  activeFilter: 'all',
  isLoading: true,
  isInitialized: false,

  initializeStore: () => {
    console.log('Initializing SectionControlStore with Firestore...');
    const q = query(collection(db, 'sections'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const sectionsMap: Record<string, CiseCommandHubControlledSection> = {};
      snapshot.docs.forEach(doc => {
        sectionsMap[doc.id] = { id: doc.id, ...doc.data() } as CiseCommandHubControlledSection;
      });
      
      set({ sections: sectionsMap, isLoading: false, isInitialized: true });
    }, (error) => {
      console.error('Firestore sections subscription error:', error);
      set({ isLoading: false });
    });

    return unsubscribe;
  },

  updateSectionCustomization: async (sectionId, customization) => {
    try {
      const section = get().sections[sectionId];
      if (!section) return;

      const sectionRef = doc(db, 'sections', sectionId);
      await updateDoc(sectionRef, {
        customization: {
          ...section.customization,
          ...customization,
          styleOverrides: {
            ...section.customization.styleOverrides,
            ...(customization.styleOverrides || {})
          }
        },
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `sections/${sectionId}`);
    }
  },

  toggleSectionVisibility: async (sectionId) => {
    const section = get().sections[sectionId];
    if (!section) return;
    const newVis: VisibilityState = section.customization.visibility === 'visible' ? 'hidden' : 'visible';
    await get().updateSectionCustomization(sectionId, { visibility: newVis });
  },

  addCard: async (sectionId, cardData) => {
    try {
      const id = `card_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
      const newCard: CiseCommandHubControlledCard = {
        ...cardData as any,
        id,
        sectionId,
        status: cardData.status || 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        history: [
          {
            id: `rev_${Date.now()}`,
            timestamp: new Date().toISOString(),
            actor: 'admin@ica.iq',
            role: 'ADMIN',
            action: 'create',
            diffSummary: 'Created record initial state',
            snapshot: { ...cardData }
          }
        ]
      };

      const section = get().sections[sectionId];
      if (!section) {
        // Create section if missing? Or just fail.
        return null;
      }

      const sectionRef = doc(db, 'sections', sectionId);
      await updateDoc(sectionRef, {
        items: [...section.items, newCard],
        updatedAt: new Date().toISOString()
      });

      return newCard;
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, `sections/${sectionId}/items`);
      return null;
    }
  },

  updateCard: async (sectionId, cardId, updates) => {
    try {
      const section = get().sections[sectionId];
      if (!section) return null;

      let updated: CiseCommandHubControlledCard | null = null;
      const newItems = section.items.map(card => {
        if (card.id === cardId) {
          const newRevision: HistoryRevision = {
            id: `rev_${Date.now()}`,
            timestamp: new Date().toISOString(),
            actor: 'admin@ica.iq',
            role: 'ADMIN',
            action: 'update',
            diffSummary: `Updated fields: ${Object.keys(updates).join(', ')}`,
            snapshot: { ...card, ...updates }
          };

          updated = {
            ...card,
            ...updates,
            customization: {
              ...card.customization,
              ...(updates.customization || {}),
              styleOverrides: {
                ...card.customization.styleOverrides,
                ...(updates.customization?.styleOverrides || {})
              }
            },
            history: [newRevision, ...(card.history || [])],
            updatedAt: new Date().toISOString()
          };
          return updated;
        }
        return card;
      });

      const sectionRef = doc(db, 'sections', sectionId);
      await updateDoc(sectionRef, {
        items: newItems,
        updatedAt: new Date().toISOString()
      });

      return updated;
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `sections/${sectionId}/items/${cardId}`);
      return null;
    }
  },

  duplicateCard: async (sectionId, cardId) => {
    const section = get().sections[sectionId];
    if (!section) return null;
    const existing = section.items.find(i => i.id === cardId);
    if (!existing) return null;

    const dupData = {
      ...existing,
      headline: {
        en: `${existing.headline.en} (Copy)`,
        ar: `${existing.headline.ar} (نسخة)`,
        zh: `${existing.headline.zh} (副本)`,
        ckb: `${existing.headline.ckb} (کۆپی)`
      },
      status: 'draft' as const,
      customization: {
        ...existing.customization,
        displayOrder: section.items.length + 1
      }
    };

    return get().addCard(sectionId, dupData);
  },

  softDeleteCard: async (sectionId, cardId) => {
    const res = await get().updateCard(sectionId, cardId, { status: 'archived' });
    return !!res;
  },

  restoreCard: async (sectionId, cardId) => {
    const res = await get().updateCard(sectionId, cardId, { status: 'active' });
    return !!res;
  },

  permanentDeleteCard: async (sectionId, cardId) => {
    try {
      const section = get().sections[sectionId];
      if (!section) return false;

      const newItems = section.items.filter(i => i.id !== cardId);
      const sectionRef = doc(db, 'sections', sectionId);
      await updateDoc(sectionRef, {
        items: newItems,
        updatedAt: new Date().toISOString()
      });
      return true;
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `sections/${sectionId}/items/${cardId}`);
      return false;
    }
  },

  reorderCard: async (sectionId, cardId, direction) => {
    const section = get().sections[sectionId];
    if (!section) return;

    const items = [...section.items].sort((a, b) => a.customization.displayOrder - b.customization.displayOrder);
    const index = items.findIndex(i => i.id === cardId);
    if (index === -1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const currentOrder = items[index].customization.displayOrder;
    const targetOrder = items[targetIndex].customization.displayOrder;

    items[index].customization.displayOrder = targetOrder;
    items[targetIndex].customization.displayOrder = currentOrder;

    try {
      const sectionRef = doc(db, 'sections', sectionId);
      await updateDoc(sectionRef, {
        items: items,
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `sections/${sectionId}/reorder`);
    }
  },

  bulkUpdateStatus: async (sectionId, cardIds, status) => {
    const section = get().sections[sectionId];
    if (!section) return;
    
    const idSet = new Set(cardIds);
    const newItems = section.items.map(item => 
      idSet.has(item.id) ? { ...item, status, updatedAt: new Date().toISOString() } : item
    );

    try {
      const sectionRef = doc(db, 'sections', sectionId);
      await updateDoc(sectionRef, {
        items: newItems,
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `sections/${sectionId}/bulk-status`);
    }
  },

  bulkUpdateVisibility: async (sectionId, cardIds, visibility) => {
    const section = get().sections[sectionId];
    if (!section) return;
    
    const idSet = new Set(cardIds);
    const newItems = section.items.map(item => 
      idSet.has(item.id) ? { 
        ...item, 
        customization: { ...item.customization, visibility }, 
        updatedAt: new Date().toISOString() 
      } : item
    );

    try {
      const sectionRef = doc(db, 'sections', sectionId);
      await updateDoc(sectionRef, {
        items: newItems,
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `sections/${sectionId}/bulk-visibility`);
    }
  },

  updateCardStyleOverrides: async (sectionId, cardId, styles) => {
    const section = get().sections[sectionId];
    if (!section) return;
    const card = section.items.find(i => i.id === cardId);
    if (!card) return;

    await get().updateCard(sectionId, cardId, {
      customization: {
        ...card.customization,
        styleOverrides: {
          ...card.customization.styleOverrides,
          ...styles
        }
      }
    });
  }
}));
