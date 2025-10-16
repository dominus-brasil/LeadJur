import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  Timestamp,
  DocumentData 
} from 'firebase/firestore';
import { db } from './firebaseAlt'; // Usando configuração alternativa
import { getCurrentUser } from './authService';

// Interface para Lead (deve ser igual à do dashboard.tsx)
export interface Lead {
  id: string;
  name: string;
  company: string;
  specialty: string;
  city: string;
  state: string;
  oab: string;
  phone?: string;
  email?: string;
  address?: string;
  stage: 'no-contact' | 'contact-attempt' | 'contact-made' | 'meeting-scheduled' | 'negotiating' | 'closed' | 'future-negotiations' | 'lost' | 'cancelled';
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  userId?: string; // Adicionar campo do usuário
}

// Função para obter a coleção de leads do usuário atual
const getUserLeadsCollection = () => {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('Usuário não autenticado');
  }
  return collection(db, `users/${user.uid}/leads`);
};

// Serviços para gerenciar leads no Firebase (por usuário)
export const leadService = {
  // Adicionar um novo lead para o usuário atual
  async addLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'userId'>): Promise<string> {
    try {
      const user = getCurrentUser();
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const userLeadsCollection = getUserLeadsCollection();
      const docRef = await addDoc(userLeadsCollection, {
        ...leadData,
        userId: user.uid,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      console.log('Lead adicionado com ID:', docRef.id, 'para usuário:', user.uid);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar lead:', error);
      throw error;
    }
  },

  // Buscar todos os leads do usuário atual
  async getLeads(): Promise<Lead[]> {
    try {
      const userLeadsCollection = getUserLeadsCollection();
      const q = query(userLeadsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const leads: Lead[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        leads.push({
          id: doc.id,
          ...data
        } as Lead);
      });
      
      const user = getCurrentUser();
      console.log('Leads carregados:', leads.length, 'para usuário:', user?.uid);
      return leads;
    } catch (error) {
      console.error('Erro ao buscar leads:', error);
      throw error;
    }
  },

  // Buscar leads por estágio do usuário atual
  async getLeadsByStage(stage: Lead['stage']): Promise<Lead[]> {
    try {
      const userLeadsCollection = getUserLeadsCollection();
      const q = query(
        userLeadsCollection, 
        where('stage', '==', stage),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const leads: Lead[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        leads.push({
          id: doc.id,
          ...data
        } as Lead);
      });
      
      return leads;
    } catch (error) {
      console.error('Erro ao buscar leads por estágio:', error);
      throw error;
    }
  },

  // Atualizar um lead do usuário atual
  async updateLead(leadId: string, updates: Partial<Lead>): Promise<void> {
    try {
      const user = getCurrentUser();
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const leadRef = doc(db, `users/${user.uid}/leads`, leadId);
      await updateDoc(leadRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
      console.log('Lead atualizado:', leadId, 'para usuário:', user.uid);
    } catch (error) {
      console.error('Erro ao atualizar lead:', error);
      throw error;
    }
  },

  // Atualizar estágio do lead (para drag & drop)
  async updateLeadStage(leadId: string, newStage: Lead['stage']): Promise<void> {
    try {
      await this.updateLead(leadId, { stage: newStage });
      const user = getCurrentUser();
      console.log('Estágio do lead atualizado:', leadId, newStage, 'para usuário:', user?.uid);
    } catch (error) {
      console.error('Erro ao atualizar estágio do lead:', error);
      throw error;
    }
  },

  // Deletar um lead do usuário atual
  async deleteLead(leadId: string): Promise<void> {
    try {
      const user = getCurrentUser();
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      await deleteDoc(doc(db, `users/${user.uid}/leads`, leadId));
      console.log('Lead deletado:', leadId, 'para usuário:', user.uid);
    } catch (error) {
      console.error('Erro ao deletar lead:', error);
      throw error;
    }
  }
};