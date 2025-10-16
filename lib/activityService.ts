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
  DocumentData,
  limit 
} from 'firebase/firestore';
import { db } from './firebaseAlt'; // Usando configuração alternativa

// Interface para atividade/histórico
export interface Activity {
  id: string;
  type: 'lead_created' | 'stage_change' | 'contact_revealed' | 'note_added' | 'call_made' | 'email_sent' | 'meeting_scheduled';
  title: string;
  description: string;
  fromStage?: string;
  toStage?: string;
  createdAt: Timestamp;
  metadata?: Record<string, any>;
}

// Interface para estatísticas do dashboard
export interface DashboardStats {
  totalLeads: number;
  totalLawyers: number;
  contactsRevealed: number;
  conversionRate: number;
  stageDistribution: Record<string, number>;
  recentActivities: Activity[];
}

// Nome das coleções no Firestore
const LEADS_COLLECTION = 'leads';
const ACTIVITIES_SUBCOLLECTION = 'activities';

// Serviços para gerenciar atividades no Firebase
export const activityService = {
  // Adicionar uma nova atividade como subcoleção do lead
  async addActivity(leadId: string, activityData: Omit<Activity, 'id' | 'createdAt'>): Promise<string> {
    try {
      const activitiesRef = collection(db, LEADS_COLLECTION, leadId, ACTIVITIES_SUBCOLLECTION);
      const docRef = await addDoc(activitiesRef, {
        ...activityData,
        createdAt: Timestamp.now()
      });
      console.log('Atividade adicionada:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar atividade:', error);
      throw error;
    }
  },

  // Buscar atividades de um lead específico (subcoleção)
  async getActivitiesByLead(leadId: string): Promise<Activity[]> {
    try {
      const activitiesRef = collection(db, LEADS_COLLECTION, leadId, ACTIVITIES_SUBCOLLECTION);
      const q = query(activitiesRef, orderBy('createdAt', 'asc')); // Mudado para 'asc' (ordem crescente)
      const querySnapshot = await getDocs(q);
      
      const activities: Activity[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        activities.push({
          id: doc.id,
          ...data
        } as Activity);
      });
      
      return activities;
    } catch (error) {
      console.error('Erro ao buscar atividades do lead:', error);
      throw error;
    }
  },

  // Buscar atividades recentes (para o dashboard) - NOTA: Com subcoleções, isso precisa ser feito de forma diferente
  async getRecentActivities(limitCount: number = 10): Promise<Activity[]> {
    try {
      // Como as atividades agora são subcoleções, precisaríamos buscar em todos os leads
      // Por enquanto, retornamos array vazio. Em uma implementação real, você pode:
      // 1. Manter uma coleção global de atividades para consultas rápidas
      // 2. Ou buscar as atividades de leads específicos
      console.log('getRecentActivities não implementado para subcoleções - retornando array vazio');
      return [];
    } catch (error) {
      console.error('Erro ao buscar atividades recentes:', error);
      throw error;
    }
  },

  // Registrar mudança de estágio
  async logStageChange(leadId: string, leadName: string, fromStage: string, toStage: string): Promise<void> {
    try {
      const stageNames: Record<string, string> = {
        'no-contact': 'Sem Contato',
        'contact-attempt': 'Tentativa de Contato',
        'contact-made': 'Contato Realizado',
        'meeting-scheduled': 'Reunião Agendada',
        'negotiating': 'Em Negociação',
        'closed': 'Fechado',
        'future-negotiations': 'Negociações Futuras',
        'lost': 'Perdido',
        'cancelled': 'Cancelado'
      };

      await this.addActivity(leadId, {
        type: 'stage_change',
        title: `Movido para "${stageNames[toStage]}"`,
        description: `${leadName} foi movido de "${stageNames[fromStage]}" para "${stageNames[toStage]}"`,
        fromStage,
        toStage
      });
    } catch (error) {
      console.error('Erro ao registrar mudança de estágio:', error);
      throw error;
    }
  },

  // Registrar revelação de contato
  async logContactRevealed(leadId: string, leadName: string, contactType: 'phone' | 'email'): Promise<void> {
    try {
      const contactTypeLabel = contactType === 'phone' ? 'telefone' : 'e-mail';
      
      await this.addActivity(leadId, {
        type: 'contact_revealed',
        title: `Contato revelado: ${contactTypeLabel}`,
        description: `${contactTypeLabel} de ${leadName} foi revelado`,
        metadata: { contactType }
      });
    } catch (error) {
      console.error('Erro ao registrar revelação de contato:', error);
      throw error;
    }
  },

  // Registrar ligação feita
  async logCallMade(leadId: string, leadName: string, duration?: string, notes?: string): Promise<void> {
    try {
      await this.addActivity(leadId, {
        type: 'call_made',
        title: 'Ligação realizada',
        description: `Ligação feita para ${leadName}${duration ? ` (duração: ${duration})` : ''}`,
        metadata: { duration, notes }
      });
    } catch (error) {
      console.error('Erro ao registrar ligação:', error);
      throw error;
    }
  },

  // Registrar e-mail enviado
  async logEmailSent(leadId: string, leadName: string, subject?: string): Promise<void> {
    try {
      await this.addActivity(leadId, {
        type: 'email_sent',
        title: 'E-mail enviado',
        description: `E-mail enviado para ${leadName}${subject ? ` - Assunto: ${subject}` : ''}`,
        metadata: { subject }
      });
    } catch (error) {
      console.error('Erro ao registrar e-mail enviado:', error);
      throw error;
    }
  },

  // Registrar criação de novo lead
  async logLeadCreated(leadId: string, leadName: string): Promise<void> {
    try {
      await this.addActivity(leadId, {
        type: 'lead_created',
        title: 'Lead criado',
        description: `Novo lead ${leadName} foi adicionado ao sistema`
      });
    } catch (error) {
      console.error('Erro ao registrar criação de lead:', error);
      throw error;
    }
  },

  // Deletar uma atividade (precisa do leadId para subcoleção)
  async deleteActivity(leadId: string, activityId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, LEADS_COLLECTION, leadId, ACTIVITIES_SUBCOLLECTION, activityId));
      console.log('Atividade deletada:', activityId);
    } catch (error) {
      console.error('Erro ao deletar atividade:', error);
      throw error;
    }
  }
};