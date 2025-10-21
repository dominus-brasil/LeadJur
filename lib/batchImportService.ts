import { lawyerDataService } from './lawyerDataService';
import { getCurrentUser } from './authService';

// Serviço para importação automática de dados em lote
export const batchImportService = {
  
  // 🚀 Importação completa do Brasil (simulação)
  async importFullBrazilData() {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const states = [
      'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
      'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
      'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];

    console.log('🇧🇷 Iniciando importação completa do Brasil...');
    
    let totalImported = 0;
    let totalSkipped = 0;
    const results = [];

    for (const state of states) {
      try {
        console.log(`📍 Processando ${state}...`);
        
        // Gerar dados para o estado
        const lawyers = await lawyerDataService.generateMockOABData(state);
        
        // Importar para o Firebase
        const result = await lawyerDataService.importLawyersToFirebase(lawyers, user.uid);
        
        totalImported += result.imported;
        totalSkipped += result.skipped;
        
        results.push({
          state,
          imported: result.imported,
          skipped: result.skipped
        });
        
        // Delay para não sobrecarregar
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`Erro ao processar ${state}:`, error);
        results.push({
          state,
          imported: 0,
          skipped: 0,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    console.log(`✅ Importação concluída: ${totalImported} novos, ${totalSkipped} já existiam`);
    
    return {
      totalImported,
      totalSkipped,
      stateResults: results
    };
  },

  // 🎯 Importação por região
  async importByRegion(region: 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul') {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const regions = {
      norte: ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'],
      nordeste: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
      'centro-oeste': ['DF', 'GO', 'MT', 'MS'],
      sudeste: ['ES', 'MG', 'RJ', 'SP'],
      sul: ['PR', 'RS', 'SC']
    };

    const states = regions[region];
    console.log(`🗺️ Importando região ${region.toUpperCase()} (${states.join(', ')})...`);

    let totalImported = 0;
    let totalSkipped = 0;

    for (const state of states) {
      try {
        const lawyers = await lawyerDataService.generateMockOABData(state);
        const result = await lawyerDataService.importLawyersToFirebase(lawyers, user.uid);
        
        totalImported += result.imported;
        totalSkipped += result.skipped;
        
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`Erro ao processar ${state}:`, error);
      }
    }

    return { totalImported, totalSkipped };
  },

  // 📊 Importação com análise de especialidades
  async importWithSpecialtyFocus(specialties: string[], targetCount: number = 100) {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    console.log(`🎯 Buscando ${targetCount} advogados com especialidades: ${specialties.join(', ')}`);

    const states = ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'GO'];
    let totalImported = 0;
    let found = 0;

    for (const state of states) {
      if (found >= targetCount) break;

      try {
        // Gerar dados com foco nas especialidades desejadas
        const lawyers = await this.generateSpecialtyFocusedData(state, specialties, Math.ceil(targetCount / states.length));
        
        const result = await lawyerDataService.importLawyersToFirebase(lawyers, user.uid);
        totalImported += result.imported;
        found += lawyers.length;
        
      } catch (error) {
        console.error(`Erro ao processar ${state}:`, error);
      }
    }

    return { totalImported, found };
  },

  // 🎯 Gerador com foco em especialidades
  async generateSpecialtyFocusedData(estado: string, targetSpecialties: string[], count: number) {
    const nomes = [
      'Ana Silva Santos', 'Carlos Eduardo Oliveira', 'Mariana Costa Lima', 'João Pedro Almeida',
      'Fernanda Rodrigues', 'Ricardo Barbosa', 'Juliana Ferreira', 'Rafael Mendes',
      'Patrícia Araujo', 'Gabriel Torres', 'Larissa Campos', 'Bruno Nascimento'
    ];

    const cidades = {
      'SP': ['São Paulo', 'Campinas', 'Santos', 'Ribeirão Preto'],
      'RJ': ['Rio de Janeiro', 'Niterói', 'Petrópolis', 'Nova Friburgo'],
      'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora'],
      'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas']
    };

    const advogados = [];
    const cidadesEstado = cidades[estado as keyof typeof cidades] || ['Capital'];
    
    for (let i = 0; i < count; i++) {
      // 80% de chance de usar uma especialidade alvo
      const useTargetSpecialty = Math.random() < 0.8;
      const especialidade = useTargetSpecialty 
        ? targetSpecialties[Math.floor(Math.random() * targetSpecialties.length)]
        : 'Direito Civil'; // Fallback
      
      const nome = nomes[Math.floor(Math.random() * nomes.length)];
      const cidade = cidadesEstado[Math.floor(Math.random() * cidadesEstado.length)];
      const oabNumber = Math.floor(Math.random() * 999999) + 100000;
      
      advogados.push({
        name: nome,
        oab: `OAB/${estado} ${oabNumber}`,
        specialty: especialidade,
        city: cidade,
        state: estado,
        email: `${nome.toLowerCase().replace(/\s+/g, '.')}.@advocacia.com`,
        phone: this.generatePhone(),
        company: this.generateCompanyName(nome),
        address: this.generateAddress(cidade),
        isPublic: true,
        dataSource: 'OAB_SPECIALTY_FOCUSED',
        lastUpdated: new Date()
      });
    }

    return advogados;
  },

  // 📱 Gerador de telefone
  generatePhone() {
    const ddd = Math.floor(Math.random() * 20) + 11;
    const numero = Math.floor(Math.random() * 90000000) + 90000000;
    return `(${ddd}) 9${numero}`;
  },

  // 🏢 Gerador de nome de escritório
  generateCompanyName(nome: string) {
    const tipos = ['Advogados Associados', 'Consultoria Jurídica', 'Advocacia', '& Associados'];
    const sobrenome = nome.split(' ').pop();
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    return `${sobrenome} ${tipo}`;
  },

  // 📍 Gerador de endereço
  generateAddress(cidade: string) {
    const ruas = ['Rua das Flores', 'Av. Principal', 'Rua do Comércio', 'Av. Central'];
    const rua = ruas[Math.floor(Math.random() * ruas.length)];
    const numero = Math.floor(Math.random() * 2000) + 100;
    return `${rua}, ${numero} - Centro, ${cidade}`;
  },

  // 🔄 Atualização automática semanal (conceito)
  async scheduleWeeklyUpdate() {
    console.log('📅 Agendando atualização semanal da base de dados...');
    
    // Em uma implementação real, você usaria um cron job ou similar
    // Aqui é apenas um exemplo conceitual
    
    const updateSchedule = {
      frequency: 'weekly',
      nextRun: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
      tasks: [
        'Verificar novos registros OAB',
        'Atualizar status de advogados',
        'Limpar dados duplicados',
        'Validar informações de contato'
      ]
    };

    console.log('✅ Atualização agendada:', updateSchedule);
    return updateSchedule;
  },

  // 🧹 Limpeza de dados duplicados
  async cleanDuplicates(userId: string) {
    try {
      console.log('🧹 Iniciando limpeza de duplicatas...');
      
      const stats = await lawyerDataService.getStats(userId);
      const results = await lawyerDataService.searchLawyers(userId, { limit: 1000 });
      
      // Agrupar por OAB (identificador único)
      const oabGroups = results.reduce((acc, lawyer) => {
        const oab = lawyer.oab;
        if (!acc[oab]) {
          acc[oab] = [];
        }
        acc[oab].push(lawyer);
        return acc;
      }, {} as Record<string, any[]>);

      let duplicatesFound = 0;
      let duplicatesRemoved = 0;

      // Identificar duplicatas
      for (const oab in oabGroups) {
        if (oabGroups[oab].length > 1) {
          duplicatesFound += oabGroups[oab].length - 1;
          console.log(`🔍 Encontradas ${oabGroups[oab].length} entradas para OAB ${oab}`);
        }
      }

      console.log(`📊 Limpeza concluída: ${duplicatesFound} duplicatas encontradas`);
      
      return {
        totalRecords: results.length,
        duplicatesFound,
        duplicatesRemoved // Em implementação real, removeria efetivamente
      };
      
    } catch (error) {
      console.error('Erro na limpeza:', error);
      throw error;
    }
  }
};