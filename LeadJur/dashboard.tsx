"use client";

import { Search, Filter, Download, Eye, MapPin, Calendar, Phone, Mail, Building, User, LogOut, BarChart3, Target, Users, TrendingUp, Home, FileText, Settings, CreditCard, Scale, X, Plus, Trash2, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCities, onlyNumbers, capitalize } from '@brazilian-utils/brazilian-utils';

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

interface Lead {
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
  const [selectedLead, setSelectedLead] = useState<{ name: string; company: string; specialty: string; city: string; state: string; oab: string; phone?: string; email?: string; address?: string } | null>(null);
  
  // Estados para drag and drop
  const [draggedLead, setDraggedLead] = useState<string | null>(null);
  
  // Estados para modal de adição de lead
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    company: '',
    specialty: '',
    city: '',
    state: '',
    oabState: '',
    oabNumber: '',
    phone: '',
    email: '',
    street: '',
    number: '',
    neighborhood: ''
  });

  // Helper: title-case while preserving spaces and partial typing
  const titleCasePreserveSpaces = (input: string) => {
    // Split by spaces but keep empty parts to preserve multiple spaces
    return input.split(/(\s+)/).map(part => {
      // if it's whitespace, keep as is
      if (/^\s+$/.test(part)) return part;
      // capitalize first letter, preserve rest as typed (not lowercasing all)
      return part.charAt(0).toUpperCase() + part.slice(1);
    }).join('');
  };
  
  // Estados para o tour
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'João Silva',
      company: 'Silva & Associados',
      specialty: 'Direito Tributário',
      city: 'São Paulo',
      state: 'SP',
      oab: 'OAB/SP 234.567',
      stage: 'no-contact'
    },
    {
      id: '2',
      name: 'Maria Santos',
      company: 'Santos Advocacia',
      specialty: 'Direito Civil',
      city: 'Rio de Janeiro',
      state: 'RJ',
      oab: 'OAB/RJ 345.678',
      stage: 'no-contact'
    },
    {
      id: '3',
      name: 'Pedro Costa',
      company: 'Costa Advogados',
      specialty: 'Direito Penal',
      city: 'Belo Horizonte',
      state: 'MG',
      oab: 'OAB/MG 456.789',
      stage: 'no-contact'
    },
    {
      id: '4',
      name: 'Ana Rodrigues',
      company: 'Rodrigues Empresarial',
      specialty: 'Direito Empresarial',
      city: 'Campinas',
      state: 'SP',
      oab: 'OAB/SP 567.890',
      stage: 'contact-attempt'
    },
    {
      id: '5',
      name: 'Carlos Mendes',
      company: 'Mendes Trabalhista',
      specialty: 'Direito Trabalhista',
      city: 'Curitiba',
      state: 'PR',
      oab: 'OAB/PR 678.901',
      stage: 'contact-attempt'
    },
    {
      id: '6',
      name: 'Fernanda Lima',
      company: 'Lima Ambiental',
      specialty: 'Direito Ambiental',
      city: 'Porto Alegre',
      state: 'RS',
      oab: 'OAB/RS 789.012',
      stage: 'contact-made'
    },
    {
      id: '7',
      name: 'Roberto Alves',
      company: 'Alves Imóveis',
      specialty: 'Direito Imobiliário',
      city: 'Florianópolis',
      state: 'SC',
      oab: 'OAB/SC 890.123',
      stage: 'contact-made'
    },
    {
      id: '8',
      name: 'Juliana Ferreira',
      company: 'Ferreira Previdência',
      specialty: 'Direito Previdenciário',
      city: 'Salvador',
      state: 'BA',
      oab: 'OAB/BA 901.234',
      stage: 'meeting-scheduled'
    },
    {
      id: '9',
      name: 'Ricardo Souza',
      company: 'Souza Digital Law',
      specialty: 'Direito Digital',
      city: 'Brasília',
      state: 'DF',
      oab: 'OAB/DF 012.345',
      stage: 'meeting-scheduled'
    },
    {
      id: '10',
      name: 'Patrícia Oliveira',
      company: 'Oliveira Societário',
      specialty: 'Direito Societário',
      city: 'Goiânia',
      state: 'GO',
      oab: 'OAB/GO 123.456',
      stage: 'negotiating'
    },
    {
      id: '11',
      name: 'Leonardo Martins',
      company: 'Martins Contratos',
      specialty: 'Direito Contratual',
      city: 'Vitória',
      state: 'ES',
      oab: 'OAB/ES 234.567',
      stage: 'closed'
    },
    {
      id: '12',
      name: 'Camila Rocha',
      company: 'Rocha & Consumidor',
      specialty: 'Direito do Consumidor',
      city: 'Fortaleza',
      state: 'CE',
      oab: 'OAB/CE 345.678',
      stage: 'closed'
    },
    {
      id: '13',
      name: 'Gabriel Santos',
      company: 'Santos International Law',
      specialty: 'Direito Internacional',
      city: 'Recife',
      state: 'PE',
      oab: 'OAB/PE 456.789',
      stage: 'future-negotiations'
    },
    {
      id: '14',
      name: 'Bruno Oliveira',
      company: 'Oliveira Eleitoral',
      specialty: 'Direito Eleitoral',
      city: 'São Luís',
      state: 'MA',
      oab: 'OAB/MA 567.890',
      stage: 'lost'
    },
    {
      id: '15',
      name: 'Alessandra Costa',
      company: 'Costa Administrativo',
      specialty: 'Direito Administrativo',
      city: 'Manaus',
      state: 'AM',
      oab: 'OAB/AM 678.901',
      stage: 'cancelled'
    }
  ]);

  // Bloquear scroll da página quando modal estiver aberto
  useEffect(() => {
    if (selectedLead || showAddLeadModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup ao desmontar o componente
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedLead, showAddLeadModal]);

  // Funções de drag and drop
  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    setDraggedLead(leadId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetStage: Lead['stage']) => {
    e.preventDefault();
    
    if (draggedLead) {
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === draggedLead 
            ? { ...lead, stage: targetStage }
            : lead
        )
      );
      setDraggedLead(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedLead(null);
  };

  // Função para filtrar leads por estágio
  const getLeadsByStage = (stage: Lead['stage']) => {
    return leads.filter(lead => lead.stage === stage);
  };

  // Funções do tour
  const tourSteps = [
    {
      title: "Bem-vindo ao LeadJur! 👋",
      description: "Vou te mostrar as principais funcionalidades da plataforma. A qualquer momento você pode clicar no botão de ajuda (?) para rever este tour.",
      target: "help-button",
      position: "bottom"
    },
    {
      title: "Painel Executivo",
      description: "Aqui você acompanha as principais métricas do seu negócio em tempo real.",
      target: "stats-section",
      position: "bottom"
    },
    {
      title: "Funil de Lead's",
      description: "Esta é a alma do sistema! Você pode arrastar e soltar os cards dos leads entre as colunas para acompanhar o progresso de cada negociação. 🚀 É só clicar, segurar e arrastar!",
      target: "funnel-section",
      position: "top"
    },
    {
      title: "Cards dos Leads",
      description: "Cada card representa um lead. Você pode arrastá-los entre as colunas conforme o status da negociação muda. Clique em um card para ver mais detalhes! 🖱️ Experimente arrastar este card agora!",
      target: "lead-card",
      position: "right"
    },
    {
      title: "Colunas do Funil",
      description: "Cada coluna representa uma fase da negociação. Arraste os cards entre elas para atualizar o status dos seus leads. É simples e intuitivo! 📊",
      target: "funnel-column",
      position: "left"
    },
    {
      title: "Aba Consultar",
      description: "Use esta aba para buscar novos advogados na nossa base de dados e adicionar como leads.",
      target: "search-tab",
      position: "bottom"
    },
    {
      title: "Aba Histórico",
      description: "Aqui você pode acompanhar todo o histórico das suas consultas realizadas.",
      target: "history-tab",
      position: "bottom"
    },
    {
      title: "Configurações",
      description: "Personalize sua experiência e gerencie sua conta nesta seção.",
      target: "settings-tab",
      position: "bottom"
    },
    {
      title: "🎉 Parabéns! Tour Completo!",
      description: "Agora você conhece todas as funcionalidades principais do LeadJur! Comece a usar o sistema para gerenciar seus leads de forma eficiente. Lembre-se: você pode arrastar os cards entre as colunas a qualquer momento!",
      target: null,
      position: "center"
    },
    {
      title: "Parabéns! 🎉",
      description: "Agora você conhece todas as funcionalidades principais do LeadJur! Comece a organizar seus leads arrastando os cards e acompanhe o crescimento do seu negócio. Qualquer dúvida, clique no botão ? novamente para refazer o tour.",
      target: null,
      position: "center"
    }
  ];

  const startTour = () => {
    setActiveTab('dashboard'); // Garantir que estamos na aba do dashboard
    setShowTour(true);
    setTourStep(0);
  };

  const nextTourStep = () => {
    if (tourStep < tourSteps.length - 1) {
      const nextStep = tourStep + 1;
      
      // Mudar para aba apropriada para cada step
      if (tourSteps[nextStep].target === 'search-tab' || 
          tourSteps[nextStep].target === 'history-tab' || 
          tourSteps[nextStep].target === 'settings-tab') {
        // Para steps das abas, manter na dashboard para mostrar as abas
        setActiveTab('dashboard');
      }
      
      setTourStep(nextStep);
    } else {
      setShowTour(false);
      setTourStep(0);
    }
  };

  const prevTourStep = () => {
    if (tourStep > 0) {
      setTourStep(tourStep - 1);
    }
  };

  const closeTour = () => {
    setShowTour(false);
    setTourStep(0);
  };

  // Efeito para destacar elementos durante o tour
  useEffect(() => {
    if (showTour && tourSteps[tourStep]?.target) {
      const element = document.getElementById(tourSteps[tourStep].target!);
      if (element) {
        element.classList.add('tour-highlight');
        
        // Para as abas, adicionar destaque especial mesmo quando ativa
        if (['search-tab', 'history-tab', 'settings-tab'].includes(tourSteps[tourStep].target!)) {
          element.classList.add('tour-tab-highlight');
        }
        
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        return () => {
          element.classList.remove('tour-highlight');
          element.classList.remove('tour-tab-highlight');
        };
      }
    }
  }, [showTour, tourStep]);

  // Função para calcular a posição do modal
  const getModalPosition = () => {
    const currentStep = tourSteps[tourStep];
    if (!currentStep?.target) return 'center';
    
    const element = document.getElementById(currentStep.target);
    if (!element) return 'center';
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Se elemento está na parte superior (primeiro terço), modal vai para baixo
    if (rect.bottom < windowHeight / 3) {
      return 'bottom';
    }
    // Se elemento está na parte inferior (último terço), modal vai para cima
    if (rect.top > (windowHeight * 2) / 3) {
      return 'top';
    }
    // Caso contrário, no lado direito
    return 'right';
  };

  const specialties = [
    'Direito Civil',
    'Direito Penal',
    'Direito Trabalhista',
    'Direito Empresarial',
    'Direito Tributário',
    'Direito Previdenciário',
    'Direito Imobiliário',
    'Direito de Família',
    'Direito Ambiental',
    'Direito Administrativo',
    'Direito Constitucional',
    'Direito Eleitoral',
    'Direito Marítimo',
    'Direito Agrário',
    'Direito Digital / Tecnologia',
    'Propriedade Intelectual',
    'Direito da Concorrência',
    'Direito do Consumidor',
    'Direito da Saúde',
    'Direito da Educação',
    'Compliance',
    'Recuperação Judicial e Falências',
    'Contratos',
    'Arbitragem e Mediação',
    'Segurança Pública',
    'Direito Bancário e Financeiro',
    'Direito Previdenciário Empresarial',
    "Direito Internacional",
    "Direito Desportivo"
  ];

  const states = ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'GO', 'ES', 'DF'];

  // Lista de cidades disponível dinamicamente via pacote (retorna todas as cidades do estado)
  // getCities expects a specific union type for state codes; cast to any to call dynamically
  const availableCities: string[] = newLeadForm.state ? getCities(newLeadForm.state as any) : [];

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

  const handleAddNewLead = () => {
    setShowAddLeadModal(true);
  };

  const handleSubmitNewLead = () => {
    // basic email check
    const emailValid = newLeadForm.email && /\S+@\S+\.\S+/.test(newLeadForm.email);
    if (
      newLeadForm.name &&
      newLeadForm.company &&
      newLeadForm.oabState &&
      newLeadForm.oabNumber &&
      newLeadForm.phone &&
      emailValid &&
      newLeadForm.street &&
      newLeadForm.number &&
      newLeadForm.neighborhood
    ) {
      const oabFormatted = `OAB/${newLeadForm.oabState} ${newLeadForm.oabNumber}`;
      const fullAddress = `${newLeadForm.street}, ${newLeadForm.number} - ${newLeadForm.neighborhood}`;
      const newLead: Lead = {
        id: (Date.now()).toString(),
        name: newLeadForm.name,
        company: newLeadForm.company,
        specialty: newLeadForm.specialty || 'Não especificado',
        city: newLeadForm.city || 'Não informado',
        state: newLeadForm.state || '--',
        oab: oabFormatted,
        phone: newLeadForm.phone,
        email: newLeadForm.email,
        address: fullAddress,
        stage: 'no-contact'
      };

      setLeads(prev => [newLead, ...prev]);
      setNewLeadForm({
        name: '',
        company: '',
        specialty: '',
        city: '',
        state: '',
        oabState: '',
        oabNumber: '',
        phone: '',
        email: '',
        street: '',
        number: '',
        neighborhood: ''
      });
      setShowAddLeadModal(false);
    }
  };

  const handleCancelAddLead = () => {
    setNewLeadForm({
      name: '',
      company: '',
      specialty: '',
      city: '',
      state: '',
      oabState: '',
      oabNumber: '',
      phone: '',
      email: '',
      street: '',
      number: '',
      neighborhood: ''
    });
    setShowAddLeadModal(false);
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
              <span className="text-2xl font-serif font-bold text-law-gold-500">LeadJur</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={startTour}
                id="help-button"
                className="flex items-center justify-center w-10 h-10 bg-law-gold-600/20 hover:bg-law-gold-600/30 border border-law-gold-600/30 hover:border-law-gold-600/50 rounded-full transition-all group"
                title="Tour pela plataforma"
              >
                <HelpCircle className="w-5 h-5 text-law-gold-400 group-hover:text-law-gold-300" />
              </button>
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
              id="search-tab"
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
              id="history-tab"
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
              id="settings-tab"
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

      <div className="max-w-7xl mx-auto px-6 py-8 pb-2 relative">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            <div className="mb-16" id="stats-section">
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
            <div className="mb-2" id="funnel-section">
              <div className="flex items-center justify-between mb-6 mt-8">
                <h2 className="text-2xl font-bold text-slate-50">Funil de Lead's</h2>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleAddNewLead}
                    className="flex items-center gap-2 px-4 py-2 bg-law-gold-600 hover:bg-law-gold-500 rounded transition-all text-law-navy-950 font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-law-navy-800/80 hover:bg-law-navy-700/80 rounded transition-all border border-law-gold-900/30 text-slate-200 font-semibold">
                    <Download className="w-4 h-4" />
                    Exportar
                  </button>
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {/* Sem Contato */}
                <div 
                  className="flex-shrink-0 w-64"
                  id="funnel-column"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'no-contact')}
                >
                  <div className="bg-slate-500/20 backdrop-blur-sm border border-slate-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-slate-300 text-sm text-center">Sem Contato ({getLeadsByStage('no-contact').length})</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto funnel-scrollbar min-h-[200px]">
                    {getLeadsByStage('no-contact').map((lead, index) => (
                      <div 
                        key={lead.id}
                        id={index === 0 ? "lead-card" : undefined}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onDragEnd={handleDragEnd}
                        onClick={() => setSelectedLead({ name: lead.name, company: lead.company, specialty: lead.specialty, city: lead.city, state: lead.state, oab: lead.oab })}
                        className={`bg-law-navy-900/50 border border-slate-500/20 rounded p-3 law-shadow cursor-move hover:border-slate-500/40 transition-all ${
                          draggedLead === lead.id ? 'opacity-50 scale-95' : ''
                        }`}
                      >
                        <div className="font-semibold text-sm text-slate-400">{lead.name}</div>
                        <div className="text-xs text-slate-400">{lead.company}</div>
                        <div className="text-xs text-slate-400 mt-3">{lead.specialty}</div>
                        <div className="text-xs text-slate-400">{lead.city}, {lead.state}</div>
                        <div className="text-xs text-slate-400">{lead.oab}</div>
                      </div>
                    ))}
                    {getLeadsByStage('no-contact').length === 0 && (
                      <div className="text-center text-slate-500 text-sm py-8">Sem Lead's</div>
                    )}
                  </div>
                </div>

                {/* Tentativa de Contato */}
                <div 
                  className="flex-shrink-0 w-64"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'contact-attempt')}
                >
                  <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-blue-300 text-sm text-center">Tentativa de Contato ({getLeadsByStage('contact-attempt').length})</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto funnel-scrollbar min-h-[200px]">
                    {getLeadsByStage('contact-attempt').map((lead) => (
                      <div 
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onDragEnd={handleDragEnd}
                        onClick={() => setSelectedLead({ name: lead.name, company: lead.company, specialty: lead.specialty, city: lead.city, state: lead.state, oab: lead.oab })}
                        className={`bg-law-navy-900/50 border border-blue-500/20 rounded p-3 law-shadow cursor-move hover:border-blue-500/40 transition-all ${
                          draggedLead === lead.id ? 'opacity-50 scale-95' : ''
                        }`}
                      >
                        <div className="font-semibold text-sm text-blue-400">{lead.name}</div>
                        <div className="text-xs text-slate-400">{lead.company}</div>
                        <div className="text-xs text-slate-400 mt-3">{lead.specialty}</div>
                        <div className="text-xs text-slate-400">{lead.city}, {lead.state}</div>
                        <div className="text-xs text-slate-400">{lead.oab}</div>
                      </div>
                    ))}
                    {getLeadsByStage('contact-attempt').length === 0 && (
                      <div className="text-center text-slate-500 text-sm py-8">Sem Lead's</div>
                    )}
                  </div>
                </div>

                {/* Contato Feito */}
                <div 
                  className="flex-shrink-0 w-64"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'contact-made')}
                >
                  <div className="bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-cyan-300 text-sm text-center">Contato Feito ({getLeadsByStage('contact-made').length})</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto funnel-scrollbar min-h-[200px]">
                    {getLeadsByStage('contact-made').map((lead) => (
                      <div 
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onDragEnd={handleDragEnd}
                        onClick={() => setSelectedLead({ name: lead.name, company: lead.company, specialty: lead.specialty, city: lead.city, state: lead.state, oab: lead.oab })}
                        className={`bg-law-navy-900/50 border border-cyan-500/20 rounded p-3 law-shadow cursor-move hover:border-cyan-500/40 transition-all ${
                          draggedLead === lead.id ? 'opacity-50 scale-95' : ''
                        }`}
                      >
                        <div className="font-semibold text-sm text-cyan-400">{lead.name}</div>
                        <div className="text-xs text-slate-400">{lead.company}</div>
                        <div className="text-xs text-slate-400 mt-3">{lead.specialty}</div>
                        <div className="text-xs text-slate-400">{lead.city}, {lead.state}</div>
                        <div className="text-xs text-slate-400">{lead.oab}</div>
                      </div>
                    ))}
                    {getLeadsByStage('contact-made').length === 0 && (
                      <div className="text-center text-slate-500 text-sm py-8">Sem Lead's</div>
                    )}
                  </div>
                </div>

                {/* Reunião Agendada */}
                <div 
                  className="flex-shrink-0 w-64"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'meeting-scheduled')}
                >
                  <div className="bg-law-gold-500/20 backdrop-blur-sm border border-law-gold-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-law-gold-300 text-sm text-center">Reunião Agendada ({getLeadsByStage('meeting-scheduled').length})</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto funnel-scrollbar min-h-[200px]">
                    {getLeadsByStage('meeting-scheduled').map((lead) => (
                      <div 
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onDragEnd={handleDragEnd}
                        onClick={() => setSelectedLead({ name: lead.name, company: lead.company, specialty: lead.specialty, city: lead.city, state: lead.state, oab: lead.oab })}
                        className={`bg-law-navy-900/50 border border-law-gold-500/20 rounded p-3 law-shadow cursor-move hover:border-law-gold-500/40 transition-all ${
                          draggedLead === lead.id ? 'opacity-50 scale-95' : ''
                        }`}
                      >
                        <div className="font-semibold text-sm text-law-gold-400">{lead.name}</div>
                        <div className="text-xs text-slate-400">{lead.company}</div>
                        <div className="text-xs text-slate-400 mt-3">{lead.specialty}</div>
                        <div className="text-xs text-slate-400">{lead.city}, {lead.state}</div>
                        <div className="text-xs text-slate-400">{lead.oab}</div>
                      </div>
                    ))}
                    {getLeadsByStage('meeting-scheduled').length === 0 && (
                      <div className="text-center text-slate-500 text-sm py-8">Sem Lead's</div>
                    )}
                  </div>
                </div>

                {/* Em Negociação */}
                <div 
                  className="flex-shrink-0 w-64"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'negotiating')}
                >
                  <div className="bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-purple-300 text-sm text-center">Em Negociação ({getLeadsByStage('negotiating').length})</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto funnel-scrollbar min-h-[200px]">
                    {getLeadsByStage('negotiating').map((lead) => (
                      <div 
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onDragEnd={handleDragEnd}
                        onClick={() => setSelectedLead({ name: lead.name, company: lead.company, specialty: lead.specialty, city: lead.city, state: lead.state, oab: lead.oab })}
                        className={`bg-law-navy-900/50 border border-purple-500/20 rounded p-3 law-shadow cursor-move hover:border-purple-500/40 transition-all ${
                          draggedLead === lead.id ? 'opacity-50 scale-95' : ''
                        }`}
                      >
                        <div className="font-semibold text-sm text-purple-400">{lead.name}</div>
                        <div className="text-xs text-slate-400">{lead.company}</div>
                        <div className="text-xs text-slate-400 mt-3">{lead.specialty}</div>
                        <div className="text-xs text-slate-400">{lead.city}, {lead.state}</div>
                        <div className="text-xs text-slate-400">{lead.oab}</div>
                      </div>
                    ))}
                    {getLeadsByStage('negotiating').length === 0 && (
                      <div className="text-center text-slate-500 text-sm py-8">Sem Lead's</div>
                    )}
                  </div>
                </div>

                {/* Fechado */}
                <div 
                  className="flex-shrink-0 w-64"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'closed')}
                >
                  <div className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-emerald-300 text-sm text-center">Fechado ({getLeadsByStage('closed').length})</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto funnel-scrollbar min-h-[200px]">
                    {getLeadsByStage('closed').map((lead) => (
                      <div 
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onDragEnd={handleDragEnd}
                        onClick={() => setSelectedLead({ name: lead.name, company: lead.company, specialty: lead.specialty, city: lead.city, state: lead.state, oab: lead.oab })}
                        className={`bg-law-navy-900/50 border border-emerald-500/20 rounded p-3 law-shadow cursor-move hover:border-emerald-500/40 transition-all ${
                          draggedLead === lead.id ? 'opacity-50 scale-95' : ''
                        }`}
                      >
                        <div className="font-semibold text-sm text-emerald-400">{lead.name}</div>
                        <div className="text-xs text-slate-400">{lead.company}</div>
                        <div className="text-xs text-slate-400 mt-3">{lead.specialty}</div>
                        <div className="text-xs text-slate-400">{lead.city}, {lead.state}</div>
                        <div className="text-xs text-slate-400">{lead.oab}</div>
                      </div>
                    ))}
                    {getLeadsByStage('closed').length === 0 && (
                      <div className="text-center text-slate-500 text-sm py-8">Sem Lead's</div>
                    )}
                  </div>
                </div>

                {/* Negociações Futuras */}
                <div 
                  className="flex-shrink-0 w-64"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'future-negotiations')}
                >
                  <div className="bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-indigo-300 text-sm text-center">Negociações Futuras ({getLeadsByStage('future-negotiations').length})</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto funnel-scrollbar min-h-[200px]">
                    {getLeadsByStage('future-negotiations').map((lead) => (
                      <div 
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onDragEnd={handleDragEnd}
                        onClick={() => setSelectedLead({ name: lead.name, company: lead.company, specialty: lead.specialty, city: lead.city, state: lead.state, oab: lead.oab })}
                        className={`bg-law-navy-900/50 border border-indigo-500/20 rounded p-3 law-shadow cursor-move hover:border-indigo-500/40 transition-all ${
                          draggedLead === lead.id ? 'opacity-50 scale-95' : ''
                        }`}
                      >
                        <div className="font-semibold text-sm text-indigo-400">{lead.name}</div>
                        <div className="text-xs text-slate-400">{lead.company}</div>
                        <div className="text-xs text-slate-400 mt-3">{lead.specialty}</div>
                        <div className="text-xs text-slate-400">{lead.city}, {lead.state}</div>
                        <div className="text-xs text-slate-400">{lead.oab}</div>
                      </div>
                    ))}
                    {getLeadsByStage('future-negotiations').length === 0 && (
                      <div className="text-center text-slate-500 text-sm py-8">Sem Lead's</div>
                    )}
                  </div>
                </div>

                {/* Perdidos */}
                <div 
                  className="flex-shrink-0 w-64"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'lost')}
                >
                  <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-red-300 text-sm text-center">Perdidos ({getLeadsByStage('lost').length})</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto funnel-scrollbar min-h-[200px]">
                    {getLeadsByStage('lost').map((lead) => (
                      <div 
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onDragEnd={handleDragEnd}
                        onClick={() => setSelectedLead({ name: lead.name, company: lead.company, specialty: lead.specialty, city: lead.city, state: lead.state, oab: lead.oab })}
                        className={`bg-law-navy-900/50 border border-red-500/20 rounded p-3 law-shadow cursor-move hover:border-red-500/40 transition-all ${
                          draggedLead === lead.id ? 'opacity-50 scale-95' : ''
                        }`}
                      >
                        <div className="font-semibold text-sm text-red-400">{lead.name}</div>
                        <div className="text-xs text-slate-400">{lead.company}</div>
                        <div className="text-xs text-slate-400 mt-3">{lead.specialty}</div>
                        <div className="text-xs text-slate-400">{lead.city}, {lead.state}</div>
                        <div className="text-xs text-slate-400">{lead.oab}</div>
                      </div>
                    ))}
                    {getLeadsByStage('lost').length === 0 && (
                      <div className="text-center text-slate-500 text-sm py-8">Sem Lead's</div>
                    )}
                  </div>
                </div>

                {/* Cancelados */}
                <div 
                  className="flex-shrink-0 w-64"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'cancelled')}
                >
                  <div className="bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-lg p-3 mb-3">
                    <h3 className="font-bold text-orange-300 text-sm text-center">Cancelados ({getLeadsByStage('cancelled').length})</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto funnel-scrollbar min-h-[200px]">
                    {getLeadsByStage('cancelled').map((lead) => (
                      <div 
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onDragEnd={handleDragEnd}
                        onClick={() => setSelectedLead({ name: lead.name, company: lead.company, specialty: lead.specialty, city: lead.city, state: lead.state, oab: lead.oab })}
                        className={`bg-law-navy-900/50 border border-orange-500/20 rounded p-3 law-shadow cursor-move hover:border-orange-500/40 transition-all ${
                          draggedLead === lead.id ? 'opacity-50 scale-95' : ''
                        }`}
                      >
                        <div className="font-semibold text-sm text-orange-400">{lead.name}</div>
                        <div className="text-xs text-slate-400">{lead.company}</div>
                        <div className="text-xs text-slate-400 mt-3">{lead.specialty}</div>
                        <div className="text-xs text-slate-400">{lead.city}, {lead.state}</div>
                        <div className="text-xs text-slate-400">{lead.oab}</div>
                      </div>
                    ))}
                    {getLeadsByStage('cancelled').length === 0 && (
                      <div className="text-center text-slate-500 text-sm py-8">Sem Lead's</div>
                    )}
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
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Email Corporativo/Pessoal</label>
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

      {/* Tour Component */}
      {showTour && (
        <>
          {/* Overlay escurecido */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"></div>
          
          {/* Modal do Tour */}
          <div className={`fixed z-[60] p-4 ${
            getModalPosition() === 'top' ? 'top-4 left-1/2 transform -translate-x-1/2' : 
            getModalPosition() === 'bottom' ? 'bottom-4 left-1/2 transform -translate-x-1/2' : 
            getModalPosition() === 'right' ? 'top-1/2 right-4 transform -translate-y-1/2' :
            'inset-0 flex items-center justify-center'
          }`}>
            <div className="bg-law-navy-900 border border-law-gold-900/30 rounded-lg max-w-lg w-full mx-4 law-shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-law-navy-800 to-law-navy-750 border-b border-law-gold-900/30 p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-law-gold-600/20 rounded-full flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-law-gold-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-50">Tour Interativo</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-slate-400 bg-law-navy-800/50 px-3 py-1 rounded-full">
                    {tourStep + 1} de {tourSteps.length}
                  </div>
                  <button
                    onClick={closeTour}
                    className="w-8 h-8 hover:bg-law-navy-700/50 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-400 hover:text-slate-200" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="text-xl font-bold text-law-gold-400 mb-3">
                  {tourSteps[tourStep]?.title}
                </h4>
                <p className="text-slate-300 leading-relaxed mb-6 text-base">
                  {tourSteps[tourStep]?.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-400">Progresso do Tour</span>
                    <span className="text-sm text-law-gold-400 font-semibold">
                      {Math.round(((tourStep + 1) / tourSteps.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-law-navy-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-law-gold-600 to-law-gold-500 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${((tourStep + 1) / tourSteps.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {tourStep > 0 && (
                      <button
                        onClick={prevTourStep}
                        className="flex items-center gap-2 px-4 py-2 bg-law-navy-800 hover:bg-law-navy-700 border border-law-gold-900/30 hover:border-law-gold-600/50 text-slate-300 hover:text-slate-100 rounded-lg transition-all font-medium"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Anterior
                      </button>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={closeTour}
                      className="px-4 py-2 text-slate-400 hover:text-slate-200 transition-colors font-medium"
                    >
                      Pular Tour
                    </button>
                    <button
                      onClick={nextTourStep}
                      className="flex items-center gap-2 px-6 py-2 bg-law-gold-600 hover:bg-law-gold-500 text-law-navy-950 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                    >
                      {tourStep === tourSteps.length - 1 ? 'Finalizar Tour' : 'Próximo'}
                      {tourStep !== tourSteps.length - 1 && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal de Adicionar Lead */}
      {showAddLeadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-law-navy-900 border border-law-gold-900/30 rounded-lg max-w-lg w-full max-h-[85vh] law-shadow-lg flex flex-col my-8">
            <div className="bg-law-navy-900 border-b border-law-gold-900/30 p-4 flex justify-between items-center flex-shrink-0">
              <h2 className="text-xl font-bold text-slate-50">Adicionar Novo Lead</h2>
              <button
                onClick={handleCancelAddLead}
                className="p-2 hover:bg-law-navy-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-300" />
              </button>
            </div>
            
            <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar flex-1">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-200 mb-2">Nome *</label>
                <input
                  type="text"
                  value={newLeadForm.name}
                  onChange={(e) => {
                    const titled = titleCasePreserveSpaces(e.target.value);
                    setNewLeadForm(prev => ({ ...prev, name: titled }));
                  }}
                  placeholder="Nome completo do advogado"
                  className="w-full px-4 py-2 bg-law-navy-800/80 border border-law-gold-900/30 rounded focus:outline-none focus:ring-2 focus:ring-law-gold-600 text-slate-100 placeholder-slate-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-200 mb-2">Empresa *</label>
                <input
                  type="text"
                  value={newLeadForm.company}
                  onChange={(e) => {
                    const titled = titleCasePreserveSpaces(e.target.value);
                    setNewLeadForm(prev => ({ ...prev, company: titled }));
                  }}
                  placeholder="Nome do escritório de advocacia"
                  className="w-full px-4 py-2 bg-law-navy-800/80 border border-law-gold-900/30 rounded focus:outline-none focus:ring-2 focus:ring-law-gold-600 text-slate-100 placeholder-slate-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-200 mb-2">OAB *</label>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={newLeadForm.oabState}
                    onChange={(e) => setNewLeadForm(prev => ({ ...prev, oabState: e.target.value }))}
                    className="px-3 py-2 bg-law-navy-800/80 border border-law-gold-900/30 rounded focus:outline-none focus:ring-2 focus:ring-law-gold-600 text-slate-100"
                    required
                  >
                    <option value="">Estado</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="SC">SC</option>
                    <option value="SP">SP</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                  </select>
                  <input
                    type="text"
                    value={newLeadForm.oabNumber}
                    onChange={(e) => {
                      // store only digits, max 9
                      const digits = onlyNumbers(e.target.value).slice(0, 9);
                      setNewLeadForm(prev => ({ ...prev, oabNumber: digits }));
                    }}
                    placeholder="123456"
                    className="px-4 py-2 bg-law-navy-800/80 border border-law-gold-900/30 rounded focus:outline-none focus:ring-2 focus:ring-law-gold-600 text-slate-100 placeholder-slate-500"
                    required
                  />
                </div>
                {newLeadForm.oabState && newLeadForm.oabNumber && (
                  <div className="mt-2 text-sm text-slate-300">
                    Resultado: OAB/{newLeadForm.oabState} {(() => {
                      const d = newLeadForm.oabNumber;
                      if (d.length > 3) {
                        return `${d.slice(0, d.length - 3)}.${d.slice(d.length - 3)}`;
                      }
                      return d;
                    })()}
                  </div>
                )}

                {/* Specialty select placed under OAB as requested */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-slate-200 mb-2">Especialidade <span className="text-white">*</span></label>
                  <select
                    value={newLeadForm.specialty}
                    onChange={(e) => setNewLeadForm(prev => ({ ...prev, specialty: e.target.value }))}
                    className="w-full px-3 py-2 bg-law-navy-800/80 border border-law-gold-900/30 rounded focus:outline-none focus:ring-2 focus:ring-law-gold-600 text-slate-100"
                    required
                  >
                    <option value="">Selecione uma especialidade</option>
                    <option value="Direito Civil">Direito Civil</option>
                    <option value="Direito Penal">Direito Penal</option>
                    <option value="Direito Trabalhista">Direito Trabalhista</option>
                    <option value="Direito Empresarial">Direito Empresarial</option>
                    <option value="Direito Tributário">Direito Tributário</option>
                    <option value="Direito Previdenciário">Direito Previdenciário</option>
                    <option value="Direito Imobiliário">Direito Imobiliário</option>
                    <option value="Direito de Família">Direito de Família</option>
                    <option value="Direito Ambiental">Direito Ambiental</option>
                    <option value="Direito Administrativo">Direito Administrativo</option>
                    <option value="Direito Constitucional">Direito Constitucional</option>
                    <option value="Direito Eleitoral">Direito Eleitoral</option>
                    <option value="Direito Marítimo">Direito Marítimo</option>
                    <option value="Direito Agrário">Direito Agrário</option>
                    <option value="Direito Digital / Tecnologia">Direito Digital / Tecnologia</option>
                    <option value="Propriedade Intelectual">Propriedade Intelectual</option>
                    <option value="Direito da Concorrência">Direito da Concorrência</option>
                    <option value="Direito do Consumidor">Direito do Consumidor</option>
                    <option value="Direito da Saúde">Direito da Saúde</option>
                    <option value="Direito da Educação">Direito da Educação</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Recuperação Judicial e Falências">Recuperação Judicial e Falências</option>
                    <option value="Contratos">Contratos</option>
                    <option value="Arbitragem e Mediação">Arbitragem e Mediação</option>
                    <option value="Segurança Pública">Segurança Pública</option>
                    <option value="Direito Bancário e Financeiro">Direito Bancário e Financeiro</option>
                    <option value="Direito Previdenciário Empresarial">Direito Previdenciário Empresarial</option>
                    <option value="Direito Internacional">Direito Internacional</option>
                    <option value="Direito Desportivo">Direito Desportivo</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-slate-200 mb-2">Email *</label>
                  <input
                    type="email"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="contato@exemplo.com"
                    className="w-full px-4 py-2 bg-law-navy-800/80 border border-law-gold-900/30 rounded focus:outline-none focus:ring-2 focus:ring-law-gold-600 text-slate-100 placeholder-slate-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Endereço (Rua) *</label>
                    <input
                      type="text"
                      value={newLeadForm.street}
                      onChange={(e) => {
                        // allow letters and spaces only, preserve accents; apply title case
                        const lettersOnly = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
                        const titled = titleCasePreserveSpaces(lettersOnly);
                        setNewLeadForm(prev => ({ ...prev, street: titled }));
                      }}
                      placeholder="Rua Exemplo"
                      className="w-full px-4 py-2 bg-law-navy-800/80 border border-law-gold-900/30 rounded focus:outline-none focus:ring-2 focus:ring-law-gold-600 text-slate-100 placeholder-slate-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Número *</label>
                    <input
                      type="text"
                      value={newLeadForm.number}
                      onChange={(e) => {
                        // only digits, max 4
                        const digits = onlyNumbers(e.target.value).slice(0, 4);
                        setNewLeadForm(prev => ({ ...prev, number: digits }));
                      }}
                      placeholder="123"
                      className="w-full px-4 py-2 bg-law-navy-800/80 border border-law-gold-900/30 rounded focus:outline-none focus:ring-2 focus:ring-law-gold-600 text-slate-100 placeholder-slate-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">Bairro *</label>
                    <input
                      type="text"
                      value={newLeadForm.neighborhood}
                      onChange={(e) => {
                        // letters and spaces only, title-case
                        const lettersOnly = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
                        const titled = titleCasePreserveSpaces(lettersOnly);
                        setNewLeadForm(prev => ({ ...prev, neighborhood: titled }));
                      }}
                      placeholder="Bairro"
                      className="w-full px-4 py-2 bg-law-navy-800/80 border border-law-gold-900/30 rounded focus:outline-none focus:ring-2 focus:ring-law-gold-600 text-slate-100 placeholder-slate-500"
                      required
                    />
                  </div>
                </div>
                {/* Validação: mínimo 5 dígitos */}
                {newLeadForm.oabNumber && newLeadForm.oabNumber.length < 5 && (
                  <div className="mt-2 text-sm text-red-400">O número da OAB precisa ter ao menos 5 dígitos.</div>
                )}
              </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">Estado <span className="text-white">*</span></label>
                  <select
                    value={newLeadForm.state}
                    onChange={(e) => setNewLeadForm(prev => ({ ...prev, state: e.target.value, city: '' }))}
                    className="w-full px-3 py-2 bg-law-navy-800/80 border border-law-gold-900/30 rounded focus:outline-none focus:ring-2 focus:ring-law-gold-600 text-slate-100"
                  >
                    <option value="">UF</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">Cidade <span className="text-white">*</span></label>
                  <select
                    value={newLeadForm.city}
                    onChange={(e) => setNewLeadForm(prev => ({ ...prev, city: e.target.value }))}
                    disabled={!newLeadForm.state}
                    className="w-full px-3 py-2 bg-law-navy-800/80 border border-law-gold-900/30 rounded focus:outline-none focus:ring-2 focus:ring-law-gold-600 text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {!newLeadForm.state ? 'Selecione um estado primeiro' : 'Selecione uma cidade'}
                    </option>
                    {availableCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-xs text-slate-400 mt-2">
                * Campos obrigatórios
              </div>
            </div>

            <div className="p-4 border-t border-law-gold-900/30 flex gap-3 justify-end flex-shrink-0">
              <button
                onClick={handleCancelAddLead}
                className="px-4 py-2 bg-law-navy-800/80 border border-law-gold-900/30 text-slate-200 rounded font-semibold hover:bg-law-navy-700/80 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitNewLead}
                disabled={
                  !newLeadForm.name ||
                  !newLeadForm.company ||
                  !newLeadForm.specialty ||
                  !newLeadForm.state ||
                  !newLeadForm.city ||
                  !newLeadForm.oabState ||
                  !newLeadForm.oabNumber ||
                  newLeadForm.oabNumber.length < 5 ||
                  !newLeadForm.phone ||
                  !newLeadForm.email ||
                  !/\S+@\S+\.\S+/.test(newLeadForm.email) ||
                  !newLeadForm.street ||
                  !newLeadForm.number ||
                  !newLeadForm.neighborhood
                }
                className="px-4 py-2 bg-law-gold-600 hover:bg-law-gold-500 text-law-navy-950 rounded font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Adicionar Lead
              </button>
            </div>
          </div>
        </div>
      )}

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