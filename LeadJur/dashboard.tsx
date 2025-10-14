"use client";

import { Search, Filter, Download, Eye, MapPin, Calendar, Phone, Mail, Building, User, LogOut, BarChart3, Target, Users, TrendingUp, Home, FileText, Settings, CreditCard, Scale, X, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DashboardProps {
  onLogout: () => void;
}

interface Lawyer {
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
}

type TabType = 'dashboard' | 'search' | 'history' | 'settings';

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<Lawyer[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [revealedContacts, setRevealedContacts] = useState<Set<string>>(new Set());
  const [addedLeads, setAddedLeads] = useState<Set<string>>(new Set());
  const [selectedLead, setSelectedLead] = useState<{ name: string; company: string; specialty: string; city: string; state: string; oab: string } | null>(null);

  // Bloquear scroll da página quando modal estiver aberto
  useEffect(() => {
    if (selectedLead) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup ao desmontar o componente
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedLead]);

  const specialties = [
    'Direito Civil', 'Direito Penal', 'Direito Trabalhista', 'Direito Empresarial',
    'Direito Tributário', 'Direito Previdenciário', 'Direito Imobiliário', 'Direito de Família'
  ];

  const states = ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'GO', 'ES', 'DF'];

  const mockResults: Lawyer[] = [
    {
      id: '1',
      name: 'Ana Silva Santos',
      oab: 'SP 123.456',
      specialty: 'Direito Civil',
      city: 'São Paulo',
      state: 'SP',
      phone: '(11) 99999-1234',
      email: 'ana.silva@exemplo.com',
      address: 'Av. Paulista, 1000 - Bela Vista',
      firm: 'Silva & Associados',
      experience: '8 anos',
      status: 'active'
    },
    {
      id: '2',
      name: 'Carlos Eduardo Lima',
      oab: 'RJ 234.567',
      specialty: 'Direito Empresarial',
      city: 'Rio de Janeiro',
      state: 'RJ',
      phone: '(21) 98888-5678',
      email: 'carlos.lima@exemplo.com',
      address: 'Rua da Assembleia, 10 - Centro',
      firm: 'Lima Advocacia',
      experience: '12 anos',
      status: 'active'
    },
    {
      id: '3',
      name: 'Mariana Oliveira',
      oab: 'MG 345.678',
      specialty: 'Direito Trabalhista',
      city: 'Belo Horizonte',
      state: 'MG',
      phone: '(31) 97777-9012',
      email: 'mariana.oliveira@exemplo.com',
      address: 'Av. Afonso Pena, 1500 - Funcionários',
      firm: 'Oliveira & Parceiros',
      experience: '6 anos',
      status: 'active'
    }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    setHasSearched(true);
    
    setTimeout(() => {
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedSpecialty('');
    setSelectedState('');
    setSelectedCity('');
    setSearchResults([]);
    setHasSearched(false);
    setShowFilters(false);
    setRevealedContacts(new Set());
  };

  const toggleContactReveal = (lawyerId: string) => {
    setRevealedContacts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(lawyerId)) {
        newSet.delete(lawyerId);
      } else {
        newSet.add(lawyerId);
      }
      return newSet;
    });
  };

  const addLead = (lawyerId: string) => {
    setAddedLeads(prev => {
      const newSet = new Set(prev);
      newSet.add(lawyerId);
      return newSet;
    });
  };

  const removeLead = (lawyerId: string) => {
    setAddedLeads(prev => {
      const newSet = new Set(prev);
      newSet.delete(lawyerId);
      return newSet;
    });
  };

  const stats = [
    { label: 'Consultas Realizadas', value: '1.234', icon: Search, color: 'gold' },
    { label: 'Profissionais Encontrados', value: '5.678', icon: Target, color: 'gold' },
    { label: 'Taxa de Precisão', value: '97%', icon: TrendingUp, color: 'gold' },
    { label: 'Registros Ativos', value: '892', icon: Users, color: 'gold' }
  ];

  return (
    <div className="min-h-screen bg-law-navy-950 text-slate-100 custom-scrollbar">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
        <div className="absolute inset-0" style={{backgroundImage: 'repeating-linear-gradient(90deg, #d4a12a 0px, transparent 1px, transparent 40px), repeating-linear-gradient(0deg, #d4a12a 0px, transparent 1px, transparent 40px)'}}></div>
      </div>
      
      {/* Header */}
      <header className="border-b border-law-gold-900/20 backdrop-blur-xl bg-law-navy-950/95 sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Scale className="w-8 h-8 text-law-gold-500" />
              <span className="text-2xl font-bold text-law-gold-500">LeadJur</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-300">
                <span className="font-semibold text-slate-100">João Silva</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-law-gold-400 hover:bg-law-navy-800/50 rounded transition-all font-medium"
              >
                <LogOut className="w-4 h-4" />
                Encerrar Sessão
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-law-gold-600 text-law-navy-950'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-law-navy-800/50'
              }`}
            >
              <Home className="w-4 h-4" />
              Painel
            </button>
            
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition-all ${
                activeTab === 'search'
                  ? 'bg-law-gold-600 text-law-navy-950'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-law-navy-800/50'
              }`}
            >
              <Search className="w-4 h-4" />
              Consultar
            </button>
            
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition-all ${
                activeTab === 'history'
                  ? 'bg-law-gold-600 text-law-navy-950'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-law-navy-800/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              Histórico
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-law-gold-600 text-law-navy-950'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-law-navy-800/50'
              }`}
            >
              <Settings className="w-4 h-4" />
              Configurações
            </button>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 relative">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-6 text-slate-50">Painel Executivo</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = {
                gold: 'bg-law-gold-900/30 text-law-gold-400'
              };
              
              return (
                <div key={index} className="bg-law-navy-900/50 backdrop-blur-sm border border-law-gold-900/30 rounded-lg p-6 law-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${colorClasses[stat.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <BarChart3 className="w-5 h-5 text-law-gold-600" />
                  </div>
                  <div className="text-2xl font-bold mb-1 text-slate-50">{stat.value}</div>
                  <div className="text-sm text-slate-300 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

            {/* Sales Funnel */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-slate-50">Funil de Vendas</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {/* Sem Contato */}
                <div className="flex-shrink-0 w-64">
                  <div className="bg-slate-500/20 backdrop-blur-sm border border-slate-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-slate-300 text-sm text-center">Sem Contato (3)</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                    <div 
                      onClick={() => setSelectedLead({ name: 'João Silva', company: 'Silva & Associados', specialty: 'Direito Tributário', city: 'São Paulo', state: 'SP', oab: 'OAB/SP 234.567' })}
                      className="bg-law-navy-900/50 border border-slate-500/20 rounded p-3 law-shadow cursor-pointer hover:border-slate-500/40 transition-colors"
                    >
                      <div className="font-semibold text-sm text-slate-400">João Silva</div>
                      <div className="text-xs text-slate-400">Silva & Associados</div>
                      <div className="text-xs text-slate-400 mt-3">Direito Tributário</div>
                      <div className="text-xs text-slate-400">São Paulo, SP</div>
                      <div className="text-xs text-slate-400">OAB/SP 234.567</div>
                    </div>
                    <div 
                      onClick={() => setSelectedLead({ name: 'Maria Santos', company: 'Santos Advocacia', specialty: 'Direito Civil', city: 'Rio de Janeiro', state: 'RJ', oab: 'OAB/RJ 345.678' })}
                      className="bg-law-navy-900/50 border border-slate-500/20 rounded p-3 law-shadow cursor-pointer hover:border-slate-500/40 transition-colors"
                    >
                      <div className="font-semibold text-sm text-slate-400">Maria Santos</div>
                      <div className="text-xs text-slate-400">Santos Advocacia</div>
                      <div className="text-xs text-slate-400 mt-3">Direito Civil</div>
                      <div className="text-xs text-slate-400">Rio de Janeiro, RJ</div>
                      <div className="text-xs text-slate-400">OAB/RJ 345.678</div>
                    </div>
                    <div 
                      onClick={() => setSelectedLead({ name: 'Pedro Costa', company: 'Costa Advogados', specialty: 'Direito Penal', city: 'Belo Horizonte', state: 'MG', oab: 'OAB/MG 456.789' })}
                      className="bg-law-navy-900/50 border border-slate-500/20 rounded p-3 law-shadow cursor-pointer hover:border-slate-500/40 transition-colors"
                    >
                      <div className="font-semibold text-sm text-slate-400">Pedro Costa</div>
                      <div className="text-xs text-slate-400">Costa Advogados</div>
                      <div className="text-xs text-slate-400 mt-3">Direito Penal</div>
                      <div className="text-xs text-slate-400">Belo Horizonte, MG</div>
                      <div className="text-xs text-slate-400">OAB/MG 456.789</div>
                    </div>
                  </div>
                </div>

                {/* Tentativa de Contato */}
                <div className="flex-shrink-0 w-64">
                  <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-blue-300 text-sm text-center">Tentativa de Contato (2)</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                    <div 
                      onClick={() => setSelectedLead({ name: 'Ana Rodrigues', company: 'Rodrigues Empresarial', specialty: 'Direito Empresarial', city: 'Campinas', state: 'SP', oab: 'OAB/SP 567.890' })}
                      className="bg-law-navy-900/50 border border-blue-500/20 rounded p-3 law-shadow cursor-pointer hover:border-blue-500/40 transition-colors"
                    >
                      <div className="font-semibold text-sm text-blue-400">Ana Rodrigues</div>
                      <div className="text-xs text-slate-400">Rodrigues Empresarial</div>
                      <div className="text-xs text-slate-400 mt-3">Direito Empresarial</div>
                      <div className="text-xs text-slate-400">Campinas, SP</div>
                      <div className="text-xs text-slate-400">OAB/SP 567.890</div>
                    </div>
                    <div 
                      onClick={() => setSelectedLead({ name: 'Carlos Mendes', company: 'Mendes Trabalhista', specialty: 'Direito Trabalhista', city: 'Curitiba', state: 'PR', oab: 'OAB/PR 678.901' })}
                      className="bg-law-navy-900/50 border border-blue-500/20 rounded p-3 law-shadow cursor-pointer hover:border-blue-500/40 transition-colors"
                    >
                      <div className="font-semibold text-sm text-blue-400">Carlos Mendes</div>
                      <div className="text-xs text-slate-400">Mendes Trabalhista</div>
                      <div className="text-xs text-slate-400 mt-3">Direito Trabalhista</div>
                      <div className="text-xs text-slate-400">Curitiba, PR</div>
                      <div className="text-xs text-slate-400">OAB/PR 678.901</div>
                    </div>
                  </div>
                </div>

                {/* Contato Feito */}
                <div className="flex-shrink-0 w-64">
                  <div className="bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-cyan-300 text-sm text-center">Contato Feito (2)</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                    <div 
                      onClick={() => setSelectedLead({ name: 'Fernanda Lima', company: 'Lima Ambiental', specialty: 'Direito Ambiental', city: 'Porto Alegre', state: 'RS', oab: 'OAB/RS 789.012' })}
                      className="bg-law-navy-900/50 border border-cyan-500/20 rounded p-3 law-shadow cursor-pointer hover:border-cyan-500/40 transition-colors"
                    >
                      <div className="font-semibold text-sm text-cyan-400">Fernanda Lima</div>
                      <div className="text-xs text-slate-400">Lima Ambiental</div>
                      <div className="text-xs text-slate-400 mt-3">Direito Ambiental</div>
                      <div className="text-xs text-slate-400">Porto Alegre, RS</div>
                      <div className="text-xs text-slate-400">OAB/RS 789.012</div>
                    </div>
                    <div 
                      onClick={() => setSelectedLead({ name: 'Roberto Alves', company: 'Alves Imóveis', specialty: 'Direito Imobiliário', city: 'Florianópolis', state: 'SC', oab: 'OAB/SC 890.123' })}
                      className="bg-law-navy-900/50 border border-cyan-500/20 rounded p-3 law-shadow cursor-pointer hover:border-cyan-500/40 transition-colors"
                    >
                      <div className="font-semibold text-sm text-cyan-400">Roberto Alves</div>
                      <div className="text-xs text-slate-400">Alves Imóveis</div>
                      <div className="text-xs text-slate-400 mt-3">Direito Imobiliário</div>
                      <div className="text-xs text-slate-400">Florianópolis, SC</div>
                      <div className="text-xs text-slate-400">OAB/SC 890.123</div>
                    </div>
                  </div>
                </div>

                {/* Reunião Agendada */}
                <div className="flex-shrink-0 w-64">
                  <div className="bg-law-gold-500/20 backdrop-blur-sm border border-law-gold-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-law-gold-300 text-sm text-center">Reunião Agendada (2)</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                    <div 
                      onClick={() => setSelectedLead({ name: 'Juliana Ferreira', company: 'Ferreira Previdência', specialty: 'Direito Previdenciário', city: 'Salvador', state: 'BA', oab: 'OAB/BA 901.234' })}
                      className="bg-law-navy-900/50 border border-law-gold-500/20 rounded p-3 law-shadow cursor-pointer hover:border-law-gold-500/40 transition-colors"
                    >
                      <div className="font-semibold text-sm text-law-gold-400">Juliana Ferreira</div>
                      <div className="text-xs text-slate-400">Ferreira Previdência</div>
                      <div className="text-xs text-slate-400 mt-3">Direito Previdenciário</div>
                      <div className="text-xs text-slate-400">Salvador, BA</div>
                      <div className="text-xs text-slate-400">OAB/BA 901.234</div>
                    </div>
                    <div 
                      onClick={() => setSelectedLead({ name: 'Ricardo Souza', company: 'Souza Digital Law', specialty: 'Direito Digital', city: 'Brasília', state: 'DF', oab: 'OAB/DF 012.345' })}
                      className="bg-law-navy-900/50 border border-law-gold-500/20 rounded p-3 law-shadow cursor-pointer hover:border-law-gold-500/40 transition-colors"
                    >
                      <div className="font-semibold text-sm text-law-gold-400">Ricardo Souza</div>
                      <div className="text-xs text-slate-400">Souza Digital Law</div>
                      <div className="text-xs text-slate-400 mt-3">Direito Digital</div>
                      <div className="text-xs text-slate-400">Brasília, DF</div>
                      <div className="text-xs text-slate-400">OAB/DF 012.345</div>
                    </div>
                  </div>
                </div>

                {/* Em Negociação */}
                <div className="flex-shrink-0 w-64">
                  <div className="bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-purple-300 text-sm text-center">Em Negociação (1)</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                    <div 
                      onClick={() => setSelectedLead({ name: 'Patrícia Oliveira', company: 'Oliveira Societário', specialty: 'Direito Societário', city: 'Goiânia', state: 'GO', oab: 'OAB/GO 123.456' })}
                      className="bg-law-navy-900/50 border border-purple-500/20 rounded p-3 law-shadow cursor-pointer hover:border-purple-500/40 transition-colors"
                    >
                      <div className="font-semibold text-sm text-purple-400">Patrícia Oliveira</div>
                      <div className="text-xs text-slate-400">Oliveira Societário</div>
                      <div className="text-xs text-slate-400 mt-3">Direito Societário</div>
                      <div className="text-xs text-slate-400">Goiânia, GO</div>
                      <div className="text-xs text-slate-400">OAB/GO 123.456</div>
                    </div>
                  </div>
                </div>

                {/* Fechado */}
                <div className="flex-shrink-0 w-64">
                  <div className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-emerald-300 text-sm text-center">Fechado (2)</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                    <div 
                      onClick={() => setSelectedLead({ name: 'Leonardo Martins', company: 'Martins Contratos', specialty: 'Direito Contratual', city: 'Vitória', state: 'ES', oab: 'OAB/ES 234.567' })}
                      className="bg-law-navy-900/50 border border-emerald-500/20 rounded p-3 law-shadow cursor-pointer hover:border-emerald-500/40 transition-colors"
                    >
                      <div className="font-semibold text-sm text-emerald-400">Leonardo Martins</div>
                      <div className="text-xs text-slate-400">Martins Contratos</div>
                      <div className="text-xs text-slate-400 mt-3">Direito Contratual</div>
                      <div className="text-xs text-slate-400">Vitória, ES</div>
                      <div className="text-xs text-slate-400">OAB/ES 234.567</div>
                    </div>
                    <div 
                      onClick={() => setSelectedLead({ name: 'Camila Rocha', company: 'Rocha & Consumidor', specialty: 'Direito do Consumidor', city: 'Fortaleza', state: 'CE', oab: 'OAB/CE 345.678' })}
                      className="bg-law-navy-900/50 border border-emerald-500/20 rounded p-3 law-shadow cursor-pointer hover:border-emerald-500/40 transition-colors"
                    >
                      <div className="font-semibold text-sm text-emerald-400">Camila Rocha</div>
                      <div className="text-xs text-slate-400">Rocha & Consumidor</div>
                      <div className="text-xs text-slate-400 mt-3">Direito do Consumidor</div>
                      <div className="text-xs text-slate-400">Fortaleza, CE</div>
                      <div className="text-xs text-slate-400">OAB/CE 345.678</div>
                    </div>
                  </div>
                </div>

                {/* Negociações Futuras */}
                <div className="flex-shrink-0 w-64">
                  <div className="bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-indigo-300 text-sm text-center">Negociações Futuras (1)</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                    <div 
                      onClick={() => setSelectedLead({ name: 'Gabriel Santos', company: 'Santos International Law', specialty: 'Direito Internacional', city: 'Recife', state: 'PE', oab: 'OAB/PE 456.789' })}
                      className="bg-law-navy-900/50 border border-indigo-500/20 rounded p-3 law-shadow cursor-pointer hover:border-indigo-500/40 transition-colors"
                    >
                      <div className="font-semibold text-sm text-indigo-400">Gabriel Santos</div>
                      <div className="text-xs text-slate-400">Santos International Law</div>
                      <div className="text-xs text-slate-400 mt-3">Direito Internacional</div>
                      <div className="text-xs text-slate-400">Recife, PE</div>
                      <div className="text-xs text-slate-400">OAB/PE 456.789</div>
                    </div>
                  </div>
                </div>

                {/* Perdidos */}
                <div className="flex-shrink-0 w-64">
                  <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-red-300 text-sm text-center">Perdidos (1)</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                    <div 
                      onClick={() => setSelectedLead({ name: 'Bruno Oliveira', company: 'Oliveira Eleitoral', specialty: 'Direito Eleitoral', city: 'São Luís', state: 'MA', oab: 'OAB/MA 567.890' })}
                      className="bg-law-navy-900/50 border border-red-500/20 rounded p-3 law-shadow cursor-pointer hover:border-red-500/40 transition-colors"
                    >
                      <div className="font-semibold text-sm text-red-400">Bruno Oliveira</div>
                      <div className="text-xs text-slate-400">Oliveira Eleitoral</div>
                      <div className="text-xs text-slate-400 mt-3">Direito Eleitoral</div>
                      <div className="text-xs text-slate-400">São Luís, MA</div>
                      <div className="text-xs text-slate-400">OAB/MA 567.890</div>
                    </div>
                  </div>
                </div>

                {/* Cancelados */}
                <div className="flex-shrink-0 w-64">
                  <div className="bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-orange-300 text-sm text-center">Cancelados (1)</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                    <div 
                      onClick={() => setSelectedLead({ name: 'Alessandra Costa', company: 'Costa Administrativo', specialty: 'Direito Administrativo', city: 'Manaus', state: 'AM', oab: 'OAB/AM 678.901' })}
                      className="bg-law-navy-900/50 border border-orange-500/20 rounded p-3 law-shadow cursor-pointer hover:border-orange-500/40 transition-colors"
                    >
                      <div className="font-semibold text-sm text-orange-400">Alessandra Costa</div>
                      <div className="text-xs text-slate-400">Costa Administrativo</div>
                      <div className="text-xs text-slate-400 mt-3">Direito Administrativo</div>
                      <div className="text-xs text-slate-400">Manaus, AM</div>
                      <div className="text-xs text-slate-400">OAB/AM 678.901</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Search Tab */}
        {activeTab === 'search' && (
          <>
        {/* Search Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-50">Consulta de Profissionais</h2>
          
          <div className="bg-law-navy-900/50 backdrop-blur-sm border border-law-gold-900/30 rounded-lg p-6 law-shadow">
            {/* Main Search */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar por nome, OAB, especialidade..."
                  className="w-full pl-10 pr-4 py-3 bg-law-navy-800/80 border border-law-gold-900/30 rounded focus:outline-none focus:ring-2 focus:ring-law-gold-600 text-slate-100 placeholder-slate-500"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 border rounded transition-all flex items-center gap-2 font-semibold ${
                  showFilters 
                    ? 'bg-law-gold-600 border-law-gold-600 text-law-navy-950' 
                    : 'bg-law-navy-800/80 border-law-gold-900/30 text-slate-300 hover:bg-law-navy-700/80'
                }`}
              >
                <Filter className="w-5 h-5" />
                Filtros
              </button>
              
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-6 py-3 bg-law-gold-600 text-law-navy-950 rounded font-bold hover:bg-law-gold-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? 'Consultando...' : 'Consultar'}
              </button>
              
              {(hasSearched || searchTerm || selectedSpecialty || selectedState || selectedCity) && (
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-law-navy-800/80 border border-law-gold-900/30 text-slate-200 rounded font-semibold hover:bg-law-navy-700/80 transition-all"
                >
                  Resetar
                </button>
              )}
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-law-navy-800/50 rounded-lg border border-law-gold-900/20">
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">Especialidade</label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full px-3 py-2 bg-law-navy-800/80 border border-law-gold-900/30 rounded focus:outline-none focus:ring-2 focus:ring-law-gold-600 text-slate-100"
                  >
                    <option value="">Todas as especialidades</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">Estado</label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full px-3 py-2 bg-law-navy-800/80 border border-law-gold-900/30 rounded focus:outline-none focus:ring-2 focus:ring-law-gold-600 text-slate-100"
                  >
                    <option value="">Todos os estados</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">Município</label>
                  <input
                    type="text"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    placeholder="Digite o município"
                    className="w-full px-3 py-2 bg-law-navy-800/80 border border-law-gold-900/30 rounded focus:outline-none focus:ring-2 focus:ring-law-gold-600 text-slate-100 placeholder-slate-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {(hasSearched || isSearching) && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-50">Resultados da Consulta</h2>
              {searchResults.length > 0 && (
                <div className="flex items-center gap-4">
                  <span className="text-slate-300 font-medium">{searchResults.length} profissionais encontrados</span>
                  <button className="flex items-center gap-2 px-4 py-2 bg-law-navy-800/80 hover:bg-law-navy-700/80 rounded transition-all border border-law-gold-900/30 text-slate-200 font-semibold">
                    <Download className="w-4 h-4" />
                    Exportar
                  </button>
                </div>
              )}
            </div>

            {isSearching ? (
              <div className="bg-law-navy-900/50 backdrop-blur-sm border border-law-gold-900/30 rounded-lg p-12 text-center law-shadow">
                <div className="w-12 h-12 border-4 border-law-gold-600/30 border-t-law-gold-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-300">Consultando base de dados...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid gap-4">
                {searchResults.map((lawyer) => (
                  <div key={lawyer.id} className="bg-law-navy-900/50 backdrop-blur-sm border border-law-gold-900/30 rounded-lg p-6 hover:border-law-gold-700/50 transition-all law-shadow">
                    <div className="grid md:grid-cols-4 gap-6">
                      <div className="md:col-span-2">
                        <div className="mb-3">
                          <h3 className="text-xl font-bold mb-2 text-slate-50">{lawyer.name}</h3>
                          <div className="flex items-center gap-2">
                            <p className="text-law-gold-500 font-semibold">{lawyer.oab}</p>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              lawyer.status === 'active' 
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                                : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                            }`}>
                              {lawyer.status === 'active' ? 'Ativo' : 'Inativo'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-slate-300">
                            <Target className="w-4 h-4 text-law-gold-500" />
                            {lawyer.specialty}
                          </div>
                          <div className="flex items-center gap-2 text-slate-300">
                            <Building className="w-4 h-4 text-law-gold-500" />
                            {lawyer.firm}
                          </div>
                          <div className="flex items-center gap-2 text-slate-300">
                            <Calendar className="w-4 h-4 text-law-gold-500" />
                            {lawyer.experience} de experiência
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-3 text-slate-200">Localização</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-slate-400">
                            <MapPin className="w-4 h-4" />
                            {lawyer.city}, {lawyer.state}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-3 text-slate-200">Contato</h4>
                        <div className={`space-y-2 text-sm relative ${!revealedContacts.has(lawyer.id) ? 'select-none' : ''}`}>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Phone className="w-4 h-4" />
                            <span className={!revealedContacts.has(lawyer.id) ? 'blur-sm' : ''}>
                              {lawyer.phone}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Mail className="w-4 h-4" />
                            <span className={!revealedContacts.has(lawyer.id) ? 'blur-sm' : ''}>
                              {lawyer.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <MapPin className="w-4 h-4" />
                            <span className={!revealedContacts.has(lawyer.id) ? 'blur-sm' : ''}>
                              {lawyer.address}
                            </span>
                          </div>
                        </div>
                        
                        {!revealedContacts.has(lawyer.id) ? (
                          <button 
                            onClick={() => toggleContactReveal(lawyer.id)}
                            className="w-full mt-4 px-4 py-2 bg-law-gold-600 text-law-navy-950 rounded font-bold hover:bg-law-gold-500 transition-all flex items-center justify-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Ver Detalhes
                          </button>
                        ) : (
                          <div className="mt-4 space-y-2">
                            {!addedLeads.has(lawyer.id) ? (
                              <button 
                                onClick={() => addLead(lawyer.id)}
                                className="w-full px-4 py-2 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
                              >
                                <Plus className="w-4 h-4" />
                                Adicionar Lead
                              </button>
                            ) : (
                              <button 
                                onClick={() => removeLead(lawyer.id)}
                                className="w-full px-4 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-500 transition-all flex items-center justify-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                Remover Lead
                              </button>
                            )}
                            <button 
                              onClick={() => toggleContactReveal(lawyer.id)}
                              className="w-full px-4 py-2 bg-law-navy-800/80 border border-law-gold-900/30 text-slate-200 rounded font-semibold hover:bg-law-navy-700/80 transition-all flex items-center justify-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              Ocultar Detalhes
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : hasSearched ? (
              <div className="bg-law-navy-900/50 backdrop-blur-sm border border-law-gold-900/30 rounded-lg p-12 text-center law-shadow">
                <Target className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-slate-50">Nenhum resultado encontrado</h3>
                <p className="text-slate-400 mb-6">Tente ajustar os filtros de consulta ou utilize termos diferentes.</p>
                <button 
                  onClick={() => setShowFilters(true)}
                  className="px-6 py-2 bg-law-gold-600 hover:bg-law-gold-500 text-law-navy-950 rounded transition-all font-bold"
                >
                  Ajustar Filtros
                </button>
              </div>
            ) : null}
          </div>
        )}
        </>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-50">Histórico de Consultas</h1>
            
            <div className="bg-law-navy-900/50 backdrop-blur-sm border border-law-gold-900/30 rounded-lg p-12 text-center law-shadow">
              <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-slate-50">Nenhuma consulta realizada</h3>
              <p className="text-slate-400 mb-6">Seu histórico de consultas será exibido aqui após a primeira pesquisa.</p>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-6 py-3 bg-law-gold-600 hover:bg-law-gold-500 text-law-navy-950 rounded transition-all font-bold"
              >
                Realizar Consulta
              </button>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-50">Configurações</h1>
            
            <div className="grid gap-6">
              {/* Perfil */}
              <div className="bg-law-navy-900/50 backdrop-blur-sm border border-law-gold-900/30 rounded-lg p-6 law-shadow">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-50">
                  <User className="w-5 h-5 text-law-gold-500" />
                  Perfil Corporativo
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Nome Completo</label>
                    <input
                      type="text"
                      defaultValue="João Silva"
                      className="w-full px-4 py-2 bg-law-navy-800/80 border border-law-gold-900/30 rounded focus:outline-none focus:ring-2 focus:ring-law-gold-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Email Corporativo</label>
                    <input
                      type="email"
                      defaultValue="joao@empresa.com"
                      className="w-full px-4 py-2 bg-law-navy-800/80 border border-law-gold-900/30 rounded focus:outline-none focus:ring-2 focus:ring-law-gold-600 text-slate-100"
                    />
                  </div>
                  <button className="px-6 py-2 bg-law-gold-600 hover:bg-law-gold-500 text-law-navy-950 rounded transition-all font-bold">
                    Salvar Alterações
                  </button>
                </div>
              </div>

              {/* Plano */}
              <div className="bg-law-navy-900/50 backdrop-blur-sm border border-law-gold-900/30 rounded-lg p-6 law-shadow">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-50">
                  <CreditCard className="w-5 h-5 text-law-gold-500" />
                  Assinatura Corporativa
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-bold text-lg text-slate-100">Período de Avaliação</p>
                    <p className="text-sm text-slate-400">5 dias restantes</p>
                  </div>
                  <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded text-sm font-bold">
                    Ativo
                  </span>
                </div>
                <button className="w-full px-6 py-3 bg-law-gold-600 text-law-navy-950 rounded font-bold hover:bg-law-gold-500 transition-all">
                  Contratar Plano Corporativo
                </button>
              </div>

              {/* Notificações */}
              <div className="bg-law-navy-900/50 backdrop-blur-sm border border-law-gold-900/30 rounded-lg p-6 law-shadow">
                <h3 className="text-xl font-bold mb-4 text-slate-50">Notificações</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-slate-300 font-medium">Atualizações corporativas</span>
                    <input type="checkbox" className="w-5 h-5 rounded border-law-gold-900/30 bg-law-navy-800/80 text-law-gold-600" defaultChecked />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-slate-300 font-medium">Alertas de novas consultas</span>
                    <input type="checkbox" className="w-5 h-5 rounded border-law-gold-900/30 bg-law-navy-800/80 text-law-gold-600" defaultChecked />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Detalhes do Lead */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-law-navy-900 border border-law-gold-900/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden law-shadow-lg flex flex-col">
            <div className="sticky top-0 bg-law-navy-900 border-b border-law-gold-900/30 p-6 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-slate-50">Detalhes do Lead</h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 hover:bg-law-navy-800/50 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-300" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
              {/* Nome e Empresa */}
              <div>
                <h3 className="text-xl font-bold text-law-gold-400 mb-2">{selectedLead.name}</h3>
                <p className="text-lg text-slate-300">{selectedLead.company}</p>
              </div>

              {/* Informações Profissionais */}
              <div className="bg-law-navy-800/30 rounded-lg p-4 space-y-3">
                <h4 className="font-bold text-slate-100 mb-3">Informações Profissionais</h4>
                
                <div className="flex items-start gap-3">
                  <Scale className="w-5 h-5 text-law-gold-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">Especialidade</p>
                    <p className="text-slate-200 font-medium">{selectedLead.specialty}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-law-gold-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">OAB</p>
                    <p className="text-slate-200 font-medium">{selectedLead.oab}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-law-gold-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">Localização</p>
                    <p className="text-slate-200 font-medium">{selectedLead.city}, {selectedLead.state}</p>
                  </div>
                </div>
              </div>

              {/* Informações de Contato */}
              <div className="bg-law-navy-800/30 rounded-lg p-4 space-y-3">
                <h4 className="font-bold text-slate-100 mb-3">Informações de Contato</h4>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-law-gold-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">Telefone</p>
                    <p className="text-slate-200 font-medium">(11) 98765-4321</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-law-gold-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">E-mail</p>
                    <p className="text-slate-200 font-medium">{selectedLead.name.toLowerCase().replace(/ /g, '.')}@{selectedLead.company.toLowerCase().replace(/ /g, '')}.com.br</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-law-gold-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">Endereço</p>
                    <p className="text-slate-200 font-medium">Av. Paulista, 1000 - Sala 800</p>
                    <p className="text-slate-200 font-medium">{selectedLead.city}, {selectedLead.state} - CEP 01310-100</p>
                  </div>
                </div>
              </div>

              {/* Histórico de Atividades */}
              <div className="bg-law-navy-800/30 rounded-lg p-4">
                <h4 className="font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-law-gold-400" />
                  Histórico de Atividades
                </h4>
                <div className="space-y-4 relative before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-law-gold-900/30">
                  <div className="flex gap-3 relative">
                    <div className="w-4 h-4 bg-law-gold-600 rounded-full mt-1 z-10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-200 font-semibold">Perfil criado</p>
                      <p className="text-sm text-slate-300">Cadastro inicial realizado com informações básicas.</p>
                      <p className="text-xs text-slate-400 mt-1">05 out 2025 às 16:40</p>
                    </div>
                  </div>

                  <div className="flex gap-3 relative">
                    <div className="w-4 h-4 bg-slate-400 rounded-full mt-1 z-10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-200 font-semibold">Lead adicionado ao sistema</p>
                      <p className="text-sm text-slate-300">Lead captado através do formulário do site.</p>
                      <p className="text-xs text-slate-400 mt-1">05 out 2025 às 16:45</p>
                    </div>
                  </div>

                  <div className="flex gap-3 relative">
                    <div className="w-4 h-4 bg-blue-400 rounded-full mt-1 z-10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-200 font-semibold">Movido para "Tentativa de Contato"</p>
                      <p className="text-sm text-slate-300">E-mail de apresentação enviado e WhatsApp enviado.</p>
                      <p className="text-xs text-slate-400 mt-1">07 out 2025 às 09:30</p>
                    </div>
                  </div>

                  <div className="flex gap-3 relative">
                    <div className="w-4 h-4 bg-cyan-400 rounded-full mt-1 z-10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-200 font-semibold">Movido para "Contato Feito"</p>
                      <p className="text-sm text-slate-300">Primeira conversa realizada. Cliente demonstrou interesse.</p>
                      <p className="text-xs text-slate-400 mt-1">08 out 2025 às 14:15</p>
                    </div>
                  </div>

                  <div className="flex gap-3 relative">
                    <div className="w-4 h-4 bg-law-gold-400 rounded-full mt-1 z-10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-200 font-semibold">Movido para "Reunião Agendada"</p>
                      <p className="text-sm text-slate-300">Reunião de apresentação agendada para 11/10/2025 às 10h.</p>
                      <p className="text-xs text-slate-400 mt-1">09 out 2025 às 11:20</p>
                    </div>
                  </div>

                  <div className="flex gap-3 relative">
                    <div className="w-4 h-4 bg-purple-400 rounded-full mt-1 z-10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-200 font-semibold">Movido para "Em Negociação"</p>
                      <p className="text-sm text-slate-300">Proposta comercial enviada e em análise pelo cliente.</p>
                      <p className="text-xs text-slate-400 mt-1">12 out 2025 às 16:45</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 relative">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full mt-1 z-10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-200 font-semibold">Movido para "Fechado"</p>
                      <p className="text-sm text-slate-300">Negociação concluída com sucesso. Contrato assinado.</p>
                      <p className="text-xs text-slate-400 mt-1">14 out 2025 às 14:30</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Ligar Agora
                </button>
                <button className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Enviar E-mail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}