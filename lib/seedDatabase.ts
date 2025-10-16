import { leadService } from './leadService';
import { lawyerService } from './lawyerService';
import { activityService } from './activityService';
import { getCurrentUser } from './authService';

// Utilitário para popular o banco de dados com dados iniciais
export const seedDatabase = {
  // Adicionar leads de exemplo
  async addSampleLeads() {
    // Verificar se há um usuário autenticado
    const user = getCurrentUser();
    if (!user) {
      throw new Error('Usuário não autenticado. Faça login antes de popular os leads.');
    }
    const sampleLeads = [
      {
        name: 'Carlos Pereira',
        company: 'Pereira Advogados',
        specialty: 'Direito Empresarial',
        city: 'São Paulo',
        state: 'SP',
        oab: 'OAB/SP 123.789',
        phone: '(11) 99876-5432',
        email: 'carlos.pereira@advocacia.com',
        address: 'Av. Faria Lima, 1200 - Itaim Bibi',
        stage: 'contact-made' as const
      },
      {
        name: 'Juliana Costa',
        company: 'Costa & Silva',
        specialty: 'Direito Trabalhista',
        city: 'Rio de Janeiro',
        state: 'RJ',
        oab: 'OAB/RJ 456.123',
        phone: '(21) 98765-4321',
        email: 'juliana.costa@advocacia.com',
        address: 'Rua Visconde de Pirajá, 550 - Ipanema',
        stage: 'meeting-scheduled' as const
      },
      {
        name: 'Ricardo Santos',
        company: 'Santos Tributário',
        specialty: 'Direito Tributário',
        city: 'Belo Horizonte',
        state: 'MG',
        oab: 'OAB/MG 789.456',
        phone: '(31) 97654-3210',
        email: 'ricardo.santos@advocacia.com',
        address: 'Av. do Contorno, 800 - Centro',
        stage: 'negotiating' as const
      },
      {
        name: 'Patrícia Lima',
        company: 'Lima Família',
        specialty: 'Direito de Família',
        city: 'Porto Alegre',
        state: 'RS',
        oab: 'OAB/RS 321.654',
        phone: '(51) 96543-2109',
        email: 'patricia.lima@advocacia.com',
        address: 'Rua dos Andradas, 1000 - Centro',
        stage: 'closed' as const
      },
      {
        name: 'Fernando Oliveira',
        company: 'Oliveira Criminal',
        specialty: 'Direito Penal',
        city: 'Brasília',
        state: 'DF',
        oab: 'OAB/DF 654.987',
        phone: '(61) 95432-1098',
        email: 'fernando.oliveira@advocacia.com',
        address: 'SHS Quadra 06, Conjunto A, Bloco E',
        stage: 'contact-attempt' as const
      }
    ];

    try {
      console.log('Adicionando leads de exemplo...');
      for (const lead of sampleLeads) {
        await leadService.addLead(lead);
      }
      console.log('Leads de exemplo adicionados com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar leads de exemplo:', error);
      throw error;
    }
  },

  // Adicionar atividades de exemplo
  async addSampleActivities() {
    try {
      console.log('Adicionando atividades de exemplo...');
      
      // Buscar alguns leads para adicionar atividades
      const leads = await leadService.getLeads();
      
      if (leads.length > 0) {
        // Adicionar atividades para os primeiros leads
        const activitiesToAdd = [
          {
            leadId: leads[0]?.id,
            type: 'contact_revealed' as const,
            title: 'Contato revelado: telefone',
            description: `Telefone de ${leads[0]?.name} foi revelado`
          },
          {
            leadId: leads[1]?.id,
            type: 'call_made' as const,
            title: 'Ligação realizada',
            description: `Ligação feita para ${leads[1]?.name} (duração: 15 min)`
          },
          {
            leadId: leads[2]?.id,
            type: 'email_sent' as const,
            title: 'E-mail enviado',
            description: `E-mail enviado para ${leads[2]?.name} - Assunto: Proposta Comercial`
          }
        ];

        for (const activity of activitiesToAdd) {
          if (activity.leadId) {
            // Remover leadId do objeto antes de passar para addActivity
            const { leadId, ...activityData } = activity;
            await activityService.addActivity(leadId, activityData);
          }
        }
      }
      
      console.log('Atividades de exemplo adicionadas com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar atividades de exemplo:', error);
      throw error;
    }
  },

  // Popular todo o banco de dados
  async populateDatabase() {
    try {
      // Verificar autenticação
      const user = getCurrentUser();
      if (!user) {
        throw new Error('Usuário não autenticado. Faça login antes de popular os dados.');
      }
      
      console.log(`Iniciando população do banco de dados para o usuário: ${user.email}`);
      
      // Verificar se já existem dados
      const [existingLeads, existingLawyers] = await Promise.all([
        leadService.getLeads(),
        lawyerService.getLawyers()
      ]);

      // Adicionar advogados se não existirem
      if (existingLawyers.length === 0) {
        console.log('Adicionando advogados de exemplo...');
        await lawyerService.addSampleLawyers();
      } else {
        console.log(`${existingLawyers.length} advogados já existem no banco para este usuário.`);
      }

      // Adicionar leads se não existirem
      if (existingLeads.length === 0) {
        console.log('Adicionando leads de exemplo para sua conta...');
        await this.addSampleLeads();
      } else {
        console.log(`${existingLeads.length} leads já existem na sua conta.`);
      }

      // Adicionar atividades
      console.log('Adicionando atividades de exemplo...');
      await this.addSampleActivities();

      console.log('População do banco de dados concluída com sucesso para sua conta!');
      return true;
    } catch (error) {
      console.error('Erro ao popular banco de dados:', error);
      throw error; // Re-throw para que o erro seja capturado na UI
    }
  },

  // Limpar todos os dados (usar com cuidado!)
  async clearDatabase() {
    try {
      console.log('⚠️ ATENÇÃO: Limpando banco de dados...');
      
      // Buscar todos os dados
      const [leads, lawyers] = await Promise.all([
        leadService.getLeads(),
        lawyerService.getLawyers()
      ]);

      // Deletar leads
      for (const lead of leads) {
        await leadService.deleteLead(lead.id);
      }

      // Deletar advogados
      for (const lawyer of lawyers) {
        await lawyerService.deleteLawyer(lawyer.id);
      }

      console.log('Banco de dados limpo com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao limpar banco de dados:', error);
      return false;
    }
  }
};