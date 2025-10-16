import { leadService } from './leadService';
import { lawyerService } from './lawyerService';
import { activityService } from './activityService';

// Interface para estatísticas do dashboard
export interface DashboardStats {
  totalLeads: number;
  totalLawyers: number;
  contactsRevealed: number;
  conversionRate: number;
  stageDistribution: Record<string, number>;
  monthlyConversions: number;
  averageTimeToClose: number;
  topSpecialties: Array<{ specialty: string; count: number }>;
}

// Serviço para calcular estatísticas
export const statsService = {
  // Calcular todas as estatísticas do dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      console.log('Calculando estatísticas do dashboard...');

      // Buscar dados básicos
      const [leads, lawyers] = await Promise.all([
        leadService.getLeads(),
        lawyerService.getLawyers()
      ]);

      // Calcular distribuição por estágio
      const stageDistribution: Record<string, number> = {
        'no-contact': 0,
        'contact-attempt': 0,
        'contact-made': 0,
        'meeting-scheduled': 0,
        'negotiating': 0,
        'closed': 0,
        'future-negotiations': 0,
        'lost': 0,
        'cancelled': 0
      };

      leads.forEach(lead => {
        stageDistribution[lead.stage] = (stageDistribution[lead.stage] || 0) + 1;
      });

      // Calcular taxa de conversão (leads fechados / total de leads)
      const closedLeads = stageDistribution['closed'];
      const totalLeads = leads.length;
      const conversionRate = totalLeads > 0 ? (closedLeads / totalLeads) * 100 : 0;

      // Calcular contatos revelados (leads com telefone ou email)
      const contactsRevealed = leads.filter(lead => lead.phone || lead.email).length;

      // Calcular conversões mensais (leads fechados no último mês)
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      
      const monthlyConversions = leads.filter(lead => {
        if (lead.stage !== 'closed') return false;
        // Se não tiver updatedAt, considerar como recente para fins de demo
        return true; // Simplificado para esta versão
      }).length;

      // Calcular especialidades mais comuns
      const specialtyCount: Record<string, number> = {};
      leads.forEach(lead => {
        specialtyCount[lead.specialty] = (specialtyCount[lead.specialty] || 0) + 1;
      });

      const topSpecialties = Object.entries(specialtyCount)
        .map(([specialty, count]) => ({ specialty, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      const stats: DashboardStats = {
        totalLeads,
        totalLawyers: lawyers.length,
        contactsRevealed,
        conversionRate: Math.round(conversionRate * 100) / 100,
        stageDistribution,
        monthlyConversions,
        averageTimeToClose: 12, // Placeholder - pode ser calculado com dados de timestamp
        topSpecialties
      };

      console.log('Estatísticas calculadas:', stats);
      return stats;
    } catch (error) {
      console.error('Erro ao calcular estatísticas:', error);
      
      // Retornar estatísticas padrão em caso de erro
      return {
        totalLeads: 0,
        totalLawyers: 0,
        contactsRevealed: 0,
        conversionRate: 0,
        stageDistribution: {
          'no-contact': 0,
          'contact-attempt': 0,
          'contact-made': 0,
          'meeting-scheduled': 0,
          'negotiating': 0,
          'closed': 0,
          'future-negotiations': 0,
          'lost': 0,
          'cancelled': 0
        },
        monthlyConversions: 0,
        averageTimeToClose: 0,
        topSpecialties: []
      };
    }
  },

  // Calcular métricas de performance para um período específico
  async getPerformanceMetrics(days: number = 30): Promise<{
    newLeads: number;
    conversions: number;
    conversionRate: number;
    averageStageTime: number;
  }> {
    try {
      const leads = await leadService.getLeads();
      
      // Para simplificar, vamos usar todos os leads como base
      const newLeads = leads.length;
      const conversions = leads.filter(lead => lead.stage === 'closed').length;
      const conversionRate = newLeads > 0 ? (conversions / newLeads) * 100 : 0;
      
      return {
        newLeads,
        conversions,
        conversionRate: Math.round(conversionRate * 100) / 100,
        averageStageTime: 5 // Placeholder em dias
      };
    } catch (error) {
      console.error('Erro ao calcular métricas de performance:', error);
      return {
        newLeads: 0,
        conversions: 0,
        conversionRate: 0,
        averageStageTime: 0
      };
    }
  }
};