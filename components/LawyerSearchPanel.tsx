import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Users, Download, Filter, Loader } from 'lucide-react';
import { lawyerDataService } from '../lib/lawyerDataService';
import { leadService } from '../lib/leadService';
import { useAuth } from '../lib/useAuth';

interface LawyerSearchResult {
  id: string;
  name: string;
  oab: string;
  specialty: string;
  city: string;
  state: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  isPublic?: boolean;
  dataSource?: string;
}

interface SearchFilters {
  name: string;
  city: string;
  state: string;
  specialty: string;
}

export const LawyerSearchPanel: React.FC = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState<SearchFilters>({
    name: '',
    city: '',
    state: '',
    specialty: ''
  });
  
  const [results, setResults] = useState<LawyerSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [selectedLawyers, setSelectedLawyers] = useState<Set<string>>(new Set());

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const especialidades = [
    'Direito Civil', 'Direito Penal', 'Direito Trabalhista', 'Direito Tributário',
    'Direito Empresarial', 'Direito de Família', 'Direito Imobiliário', 'Direito Digital',
    'Direito Previdenciário', 'Direito do Consumidor', 'Direito Administrativo',
    'Direito Ambiental', 'Direito Bancário', 'Direito Médico'
  ];

  // Carregar estatísticas ao montar o componente
  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    try {
      const statsData = await lawyerDataService.getStats(user!.uid);
      setStats(statsData);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  // Buscar advogados
  const handleSearch = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const searchResults = await lawyerDataService.searchLawyers(user.uid, {
        name: filters.name || undefined,
        city: filters.city || undefined,
        state: filters.state || undefined,
        specialty: filters.specialty || undefined,
        limit: 100
      });
      
      setResults(searchResults);
    } catch (error) {
      console.error('Erro na busca:', error);
      alert('Erro ao buscar advogados. Tente novamente.');
    }
    setLoading(false);
  };

  // Importar dados públicos da OAB
  const handleImportOABData = async (estado: string) => {
    if (!user) return;
    
    setImporting(true);
    try {
      console.log(`🔄 Importando dados da OAB-${estado}...`);
      
      // Buscar dados públicos
      const lawyers = await lawyerDataService.fetchPublicOABData(estado);
      
      // Importar para o Firebase
      const result = await lawyerDataService.importLawyersToFirebase(lawyers, user.uid);
      
      alert(`✅ Importação concluída!\n${result.imported} novos advogados adicionados\n${result.skipped} já existiam na base`);
      
      // Atualizar estatísticas
      await loadStats();
      
      // Se há filtros ativos, refazer a busca
      if (filters.name || filters.city || filters.state || filters.specialty) {
        await handleSearch();
      }
      
    } catch (error) {
      console.error('Erro na importação:', error);
      alert('Erro ao importar dados. Verifique o console para detalhes.');
    }
    setImporting(false);
  };

  // Adicionar advogado como lead
  const addToLeads = async (lawyer: LawyerSearchResult) => {
    if (!user) return;
    
    try {
      const leadData = {
        name: lawyer.name,
        company: lawyer.company,
        specialty: lawyer.specialty,
        city: lawyer.city,
        state: lawyer.state,
        oab: lawyer.oab,
        phone: lawyer.phone,
        email: lawyer.email,
        address: lawyer.address,
        stage: 'no-contact' as const
      };

      await leadService.addLead(leadData);
      alert(`✅ ${lawyer.name} adicionado aos seus leads!`);
      
    } catch (error) {
      console.error('Erro ao adicionar lead:', error);
      alert('Erro ao adicionar lead. Tente novamente.');
    }
  };

  // Selecionar/deselecionar advogados
  const toggleLawyerSelection = (lawyerId: string) => {
    const newSelection = new Set(selectedLawyers);
    if (newSelection.has(lawyerId)) {
      newSelection.delete(lawyerId);
    } else {
      newSelection.add(lawyerId);
    }
    setSelectedLawyers(newSelection);
  };

  // Adicionar múltiplos leads
  const addSelectedToLeads = async () => {
    if (!user || selectedLawyers.size === 0) return;
    
    try {
      const selectedResults = results.filter(lawyer => selectedLawyers.has(lawyer.id));
      
      for (const lawyer of selectedResults) {
        const leadData = {
          name: lawyer.name,
          company: lawyer.company,
          specialty: lawyer.specialty,
          city: lawyer.city,
          state: lawyer.state,
          oab: lawyer.oab,
          phone: lawyer.phone,
          email: lawyer.email,
          address: lawyer.address,
          stage: 'no-contact' as const
        };

        await leadService.addLead(leadData);
      }
      
      alert(`✅ ${selectedResults.length} advogados adicionados aos seus leads!`);
      setSelectedLawyers(new Set());
      
    } catch (error) {
      console.error('Erro ao adicionar leads:', error);
      alert('Erro ao adicionar leads. Tente novamente.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com Estatísticas */}
      <div className="bg-law-navy-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Search className="w-6 h-6" />
          Buscar Advogados
        </h2>
        
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-law-navy-700 p-4 rounded">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-law-gold-500" />
                <span className="font-semibold">Total de Advogados</span>
              </div>
              <div className="text-2xl font-bold text-law-gold-500">{stats.total.toLocaleString()}</div>
            </div>
            
            <div className="bg-law-navy-700 p-4 rounded">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-law-gold-500" />
                <span className="font-semibold">Cidades</span>
              </div>
              <div className="text-2xl font-bold text-law-gold-500">{stats.byCity.length}</div>
            </div>
            
            <div className="bg-law-navy-700 p-4 rounded">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-law-gold-500" />
                <span className="font-semibold">Especialidades</span>
              </div>
              <div className="text-2xl font-bold text-law-gold-500">{stats.bySpecialty.length}</div>
            </div>
          </div>
        )}

        {/* Importação de Dados */}
        <div className="bg-law-navy-700 p-4 rounded mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Importar Dados Públicos da OAB
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'GO'].map(estado => (
              <button
                key={estado}
                onClick={() => handleImportOABData(estado)}
                disabled={importing}
                className="px-3 py-2 bg-law-gold-600 hover:bg-law-gold-500 text-law-navy-950 rounded font-semibold disabled:opacity-50"
              >
                {importing ? <Loader className="w-4 h-4 animate-spin" /> : `OAB-${estado}`}
              </button>
            ))}
          </div>
          
          <p className="text-sm text-slate-400 mt-2">
            💡 Clique para importar ~50 advogados de cada estado (dados simulados para demonstração)
          </p>
        </div>
      </div>

      {/* Filtros de Busca */}
      <div className="bg-law-navy-800 rounded-lg p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtros de Busca
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nome do advogado..."
            value={filters.name}
            onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
            className="bg-law-navy-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-400"
          />
          
          <input
            type="text"
            placeholder="Cidade..."
            value={filters.city}
            onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
            className="bg-law-navy-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-400"
          />
          
          <select
            value={filters.state}
            onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value }))}
            className="bg-law-navy-700 border border-slate-600 rounded px-3 py-2 text-white"
          >
            <option value="">Todos os estados</option>
            {estados.map(estado => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
          
          <select
            value={filters.specialty}
            onChange={(e) => setFilters(prev => ({ ...prev, specialty: e.target.value }))}
            className="bg-law-navy-700 border border-slate-600 rounded px-3 py-2 text-white"
          >
            <option value="">Todas as especialidades</option>
            {especialidades.map(esp => (
              <option key={esp} value={esp}>{esp}</option>
            ))}
          </select>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-2 bg-law-gold-600 hover:bg-law-gold-500 text-law-navy-950 rounded font-semibold disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Buscar
          </button>
          
          {selectedLawyers.size > 0 && (
            <button
              onClick={addSelectedToLeads}
              className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded font-semibold flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Adicionar {selectedLawyers.size} aos Leads
            </button>
          )}
        </div>
      </div>

      {/* Resultados */}
      {results.length > 0 && (
        <div className="bg-law-navy-800 rounded-lg p-6">
          <h3 className="font-semibold mb-4">
            Resultados ({results.length} advogados encontrados)
          </h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {results.map((lawyer) => (
              <div
                key={lawyer.id}
                className={`bg-law-navy-700 p-4 rounded border-2 transition-all ${
                  selectedLawyers.has(lawyer.id) ? 'border-law-gold-500' : 'border-transparent'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedLawyers.has(lawyer.id)}
                      onChange={() => toggleLawyerSelection(lawyer.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-law-gold-500">{lawyer.name}</h4>
                      <p className="text-slate-300">{lawyer.company}</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-400">
                        <span>📍 {lawyer.city}, {lawyer.state}</span>
                        <span>⚖️ {lawyer.specialty}</span>
                        <span>🆔 {lawyer.oab}</span>
                        <span>📧 {lawyer.email}</span>
                        <span>📱 {lawyer.phone}</span>
                      </div>
                      {lawyer.isPublic && (
                        <span className="inline-block mt-2 px-2 py-1 bg-blue-600 text-xs rounded">
                          Dados Públicos OAB
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => addToLeads(lawyer)}
                    className="px-4 py-2 bg-law-gold-600 hover:bg-law-gold-500 text-law-navy-950 rounded font-semibold text-sm"
                  >
                    + Lead
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estado vazio */}
      {!loading && results.length === 0 && (
        <div className="bg-law-navy-800 rounded-lg p-8 text-center">
          <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum resultado encontrado</h3>
          <p className="text-slate-400 mb-4">
            Tente ajustar os filtros ou importe dados de advogados primeiro
          </p>
        </div>
      )}
    </div>
  );
};