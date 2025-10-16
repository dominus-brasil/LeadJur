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

// Interface para Lawyer (deve ser igual à do dashboard.tsx)
export interface Lawyer {
  id: string;
  name: string;
  oab: string;
  specialty: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  address: string;
  firm: string;
  experience: string;
  status: 'active' | 'inactive';
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Interface para filtros de busca
export interface LawyerSearchFilters {
  name?: string;
  specialty?: string;
  city?: string;
  state?: string;
  oab?: string;
}

// Nome da coleção no Firestore
const LAWYERS_COLLECTION = 'lawyers';

// Serviços para gerenciar advogados no Firebase
export const lawyerService = {
  // Adicionar um novo advogado
  async addLawyer(lawyerData: Omit<Lawyer, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, LAWYERS_COLLECTION), {
        ...lawyerData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      console.log('Advogado adicionado com ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar advogado:', error);
      throw error;
    }
  },

  // Buscar todos os advogados
  async getLawyers(): Promise<Lawyer[]> {
    try {
      const q = query(collection(db, LAWYERS_COLLECTION), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const lawyers: Lawyer[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        lawyers.push({
          id: doc.id,
          ...data
        } as Lawyer);
      });
      
      console.log('Advogados carregados:', lawyers.length);
      return lawyers;
    } catch (error) {
      console.error('Erro ao buscar advogados:', error);
      throw error;
    }
  },

  // Buscar advogados com filtros
  async searchLawyers(filters: LawyerSearchFilters): Promise<Lawyer[]> {
    try {
      let q = query(collection(db, LAWYERS_COLLECTION));

      // Aplicar filtros
      if (filters.specialty) {
        q = query(q, where('specialty', '==', filters.specialty));
      }
      if (filters.state) {
        q = query(q, where('state', '==', filters.state));
      }
      if (filters.city) {
        q = query(q, where('city', '==', filters.city));
      }
      if (filters.oab) {
        q = query(q, where('oab', '>=', filters.oab), where('oab', '<=', filters.oab + '\uf8ff'));
      }

      q = query(q, orderBy('createdAt', 'desc'));
      
      const querySnapshot = await getDocs(q);
      
      let lawyers: Lawyer[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        lawyers.push({
          id: doc.id,
          ...data
        } as Lawyer);
      });

      // Filtrar por nome no frontend (Firestore não suporta busca textual completa)
      if (filters.name) {
        const searchTerm = filters.name.toLowerCase();
        lawyers = lawyers.filter(lawyer => 
          lawyer.name.toLowerCase().includes(searchTerm)
        );
      }
      
      console.log('Advogados encontrados na busca:', lawyers.length);
      return lawyers;
    } catch (error) {
      console.error('Erro ao buscar advogados:', error);
      throw error;
    }
  },

  // Buscar advogados por especialidade
  async getLawyersBySpecialty(specialty: string): Promise<Lawyer[]> {
    try {
      const q = query(
        collection(db, LAWYERS_COLLECTION), 
        where('specialty', '==', specialty),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const lawyers: Lawyer[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        lawyers.push({
          id: doc.id,
          ...data
        } as Lawyer);
      });
      
      return lawyers;
    } catch (error) {
      console.error('Erro ao buscar advogados por especialidade:', error);
      throw error;
    }
  },

  // Atualizar um advogado
  async updateLawyer(lawyerId: string, updates: Partial<Lawyer>): Promise<void> {
    try {
      const lawyerRef = doc(db, LAWYERS_COLLECTION, lawyerId);
      await updateDoc(lawyerRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
      console.log('Advogado atualizado:', lawyerId);
    } catch (error) {
      console.error('Erro ao atualizar advogado:', error);
      throw error;
    }
  },

  // Deletar um advogado
  async deleteLawyer(lawyerId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, LAWYERS_COLLECTION, lawyerId));
      console.log('Advogado deletado:', lawyerId);
    } catch (error) {
      console.error('Erro ao deletar advogado:', error);
      throw error;
    }
  },

  // Adicionar advogados de exemplo (para popular o banco inicial)
  async addSampleLawyers(): Promise<void> {
    try {
      const sampleLawyers = [
        {
          name: 'Ana Silva Santos',
          oab: 'SP 123.456',
          specialty: 'Direito Civil',
          city: 'São Paulo',
          state: 'SP',
          phone: '(11) 99999-1234',
          email: 'ana.silva@advocacia.com',
          address: 'Av. Paulista, 1000 - Bela Vista',
          firm: 'Silva & Associados',
          experience: '8 anos',
          status: 'active' as const
        },
        {
          name: 'Carlos Eduardo Lima',
          oab: 'RJ 234.567',
          specialty: 'Direito Empresarial',
          city: 'Rio de Janeiro',
          state: 'RJ',
          phone: '(21) 98888-5678',
          email: 'carlos.lima@advocacia.com',
          address: 'Rua da Assembleia, 10 - Centro',
          firm: 'Lima Advocacia',
          experience: '12 anos',
          status: 'active' as const
        },
        {
          name: 'Mariana Oliveira',
          oab: 'MG 345.678',
          specialty: 'Direito Trabalhista',
          city: 'Belo Horizonte',
          state: 'MG',
          phone: '(31) 97777-9012',
          email: 'mariana.oliveira@advocacia.com',
          address: 'Av. Afonso Pena, 1500 - Funcionários',
          firm: 'Oliveira & Parceiros',
          experience: '6 anos',
          status: 'active' as const
        },
        {
          name: 'Roberto Costa',
          oab: 'SP 456.789',
          specialty: 'Direito Tributário',
          city: 'São Paulo',
          state: 'SP',
          phone: '(11) 98765-4321',
          email: 'roberto.costa@advocacia.com',
          address: 'Rua Augusta, 500 - Consolação',
          firm: 'Costa Tributária',
          experience: '15 anos',
          status: 'active' as const
        },
        {
          name: 'Fernanda Santos',
          oab: 'RJ 567.890',
          specialty: 'Direito Penal',
          city: 'Rio de Janeiro',
          state: 'RJ',
          phone: '(21) 97654-3210',
          email: 'fernanda.santos@advocacia.com',
          address: 'Av. Copacabana, 800 - Copacabana',
          firm: 'Santos Criminalista',
          experience: '10 anos',
          status: 'active' as const
        }
      ];

      for (const lawyer of sampleLawyers) {
        await this.addLawyer(lawyer);
      }
      
      console.log('Advogados de exemplo adicionados com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar advogados de exemplo:', error);
      throw error;
    }
  }
};