import { ChevronLeft, ChevronRight, Target, Clock, TrendingUp, Shield, DollarSign, Award, CheckCircle, XCircle, Zap, Users, BarChart3, Calendar, Phone, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function LeadJurPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 0: Capa
    {
      title: "LeadJur",
      subtitle: "Plataforma Inteligente de Prospecção Jurídica",
      type: "cover"
    },
    // Slide 1: Agenda
    {
      title: "Agenda da Apresentação",
      type: "agenda"
    },
    // Slide 2: Sobre
    {
      title: "Sobre o LeadJur",
      type: "about"
    },
    // Slide 3: Problema
    {
      title: "O Problema que Resolvemos",
      type: "problem"
    },
    // Slide 4: Solução
    {
      title: "Nossa Solução",
      type: "solution"
    },
    // Slide 5: Demo
    {
      title: "Demonstração da Plataforma",
      type: "demo"
    },
    // Slide 6: Proposta
    {
      title: "Proposta Comercial Exclusiva",
      type: "proposal"
    },
    // Slide 7: ROI
    {
      title: "ROI Esperado",
      type: "roi"
    },
    // Slide 8: Próximos Passos
    {
      title: "Próximos Passos",
      type: "nextsteps"
    },
    // Slide 9: Garantias
    {
      title: "Garantias e Compromissos",
      type: "guarantees"
    },
    // Slide 10: FAQ
    {
      title: "Perguntas Frequentes",
      type: "faq"
    },
    // Slide 11: Decisão
    {
      title: "Pronto para Começar?",
      type: "decision"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      
      {/* Navigation Bar */}
      <nav className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">L</span>
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">LeadJur</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Slide {currentSlide + 1} de {slides.length}</span>
            <div className="flex gap-2">
              <button onClick={prevSlide} disabled={currentSlide === 0} className={`p-2 rounded-lg transition-all ${currentSlide === 0 ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className={`p-2 rounded-lg transition-all ${currentSlide === slides.length - 1 ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white'}`}>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Slide 0: Cover */}
        {currentSlide === 0 && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-8">
              <span className="text-5xl font-bold">L</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              LeadJur
            </h1>
            <p className="text-3xl text-slate-300 mb-12">Plataforma Inteligente de Prospecção Jurídica</p>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 max-w-2xl">
              <p className="text-xl text-slate-400 mb-4">Apresentação Comercial</p>
              <p className="text-lg text-slate-500">Proposta Exclusiva Early-Adopter</p>
              <div className="mt-8 pt-8 border-t border-slate-800">
                <p className="text-sm text-slate-500">Preparado para: <span className="text-cyan-400 font-semibold">[Nome do Perito]</span></p>
                <p className="text-sm text-slate-500 mt-2">Data: Outubro 2025</p>
              </div>
            </div>
          </div>
        )}

        {/* Slide 1: Agenda */}
        {currentSlide === 1 && (
          <div>
            <h2 className="text-5xl font-bold mb-12 text-center">Agenda da Apresentação</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                { num: "01", title: "Sobre o LeadJur", icon: <Target className="w-6 h-6" /> },
                { num: "02", title: "O Problema que Resolvemos", icon: <Clock className="w-6 h-6" /> },
                { num: "03", title: "Nossa Solução", icon: <Zap className="w-6 h-6" /> },
                { num: "04", title: "Demonstração da Plataforma", icon: <BarChart3 className="w-6 h-6" /> },
                { num: "05", title: "Proposta Comercial Exclusiva", icon: <DollarSign className="w-6 h-6" /> },
                { num: "06", title: "ROI Esperado", icon: <TrendingUp className="w-6 h-6" /> },
                { num: "07", title: "Próximos Passos", icon: <Calendar className="w-6 h-6" /> },
                { num: "08", title: "Garantias e FAQ", icon: <Shield className="w-6 h-6" /> }
              ].map((item, i) => (
                <div key={i} onClick={() => goToSlide(i + 2)} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">
                      {item.num}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                    </div>
                    <div className="text-slate-500 group-hover:text-cyan-400 transition-colors">
                      {item.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Slide 2: About */}
        {currentSlide === 2 && (
          <div>
            <h2 className="text-5xl font-bold mb-8 text-center">Sobre o LeadJur</h2>
            <p className="text-2xl text-center text-slate-300 mb-12 max-w-4xl mx-auto">
              Plataforma SaaS que identifica e fornece contatos qualificados de advogados segmentados por área de atuação e região geográfica
            </p>
            
            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-cyan-300">Nossa Missão</h3>
              <p className="text-xl text-slate-200">
                Transformar a prospecção jurídica de <span className="text-red-400 font-bold">dias em segundos</span>, fornecendo dados verificados, atualizados e 100% em conformidade com a LGPD.
              </p>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-center">Números da Plataforma</h3>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">+50.000</div>
                <div className="text-slate-400">Leads Disponíveis</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">95%</div>
                <div className="text-slate-400">Taxa de Precisão</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">&lt;3s</div>
                <div className="text-slate-400">Tempo de Resposta</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
                <div className="text-slate-400">LGPD Compliant</div>
              </div>
            </div>
          </div>
        )}

        {/* Slide 3: Problem */}
        {currentSlide === 3 && (
          <div>
            <h2 className="text-5xl font-bold mb-12 text-center">O Problema que Resolvemos</h2>
            
            <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-8 text-center text-red-300">Processo Manual Atual</h3>
              <div className="space-y-4">
                {[
                  { task: "Busca no Google/OAB", time: "2-3 horas" },
                  { task: "Compilação de dados", time: "1-2 horas" },
                  { task: "Validação de emails", time: "1-2 horas" },
                  { task: "Busca de telefones", time: "2-3 horas" },
                  { task: "Organização em planilha", time: "1 hora" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-900/50 rounded-lg p-4">
                    <span className="text-slate-200">{item.task}</span>
                    <span className="text-red-400 font-semibold">{item.time}</span>
                  </div>
                ))}
                <div className="border-t border-slate-700 pt-4 mt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-white">TOTAL POR BUSCA:</span>
                    <span className="text-red-400">7-11 horas ⏱️</span>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-center">Problemas Comuns</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                "Dados desatualizados",
                "Emails inválidos",
                "Telefones incorretos",
                "Difícil segmentar por região",
                "Impossível filtrar por área",
                "Alto custo tempo × resultado"
              ].map((problem, i) => (
                <div key={i} className="bg-slate-900/50 border border-red-900/30 rounded-lg p-4 flex items-center gap-3">
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <span className="text-slate-300">{problem}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Slide 4: Solution */}
        {currentSlide === 4 && (
          <div>
            <h2 className="text-5xl font-bold mb-12 text-center">Nossa Solução</h2>
            
            <div className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 border border-emerald-500/30 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-8 text-center text-emerald-300">Processo Automatizado</h3>
              <div className="space-y-4">
                {[
                  { step: "1. Seleciona filtros (área + região)", time: "30 segundos" },
                  { step: "2. Sistema busca e valida dados", time: "2-3 segundos" },
                  { step: "3. Exporta planilha pronta", time: "5 segundos" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-900/50 rounded-lg p-4">
                    <span className="text-slate-200">{item.step}</span>
                    <span className="text-emerald-400 font-semibold">{item.time}</span>
                  </div>
                ))}
                <div className="border-t border-slate-700 pt-4 mt-4">
                  <div className="flex justify-between items-center text-xl font-bold mb-4">
                    <span className="text-white">TOTAL:</span>
                    <span className="text-emerald-400">40 segundos 🚀</span>
                  </div>
                  <div className="text-center text-2xl font-bold text-cyan-400">
                    ECONOMIA: 99% do tempo!
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-center">Dados Fornecidos (Verificados)</h3>
            <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {[
                "Nome completo",
                "Número OAB + Estado",
                "Área(s) de atuação",
                "Email profissional",
                "Telefone/WhatsApp",
                "Endereço completo",
                "Coordenadas (lat/lng)",
                "Score de confiabilidade"
              ].map((data, i) => (
                <div key={i} className="bg-slate-900/50 border border-emerald-900/30 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{data}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Slide 5: Demo */}
        {currentSlide === 5 && (
          <div>
            <h2 className="text-5xl font-bold mb-12 text-center">Demonstração da Plataforma</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-8">
                <div className="w-16 h-16 bg-blue-600/30 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Busca Inteligente</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Filtro por área de atuação</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Filtro geográfico (Estado/Cidade/Bairro)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Busca por múltiplas áreas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Visualização em mapa interativo</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8">
                <div className="w-16 h-16 bg-purple-600/30 rounded-xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Dashboard Analítico</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>Total de buscas realizadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>Leads exportados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>Gráficos de consumo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>Mapa de calor por região</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 border border-emerald-500/30 rounded-2xl p-8">
                <div className="w-16 h-16 bg-emerald-600/30 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Export de Dados</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Formatos: CSV e Excel (XLSX)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Seleção individual ou em massa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Download instantâneo (&lt;30 seg)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Histórico de exports (90 dias)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl p-8">
                <div className="w-16 h-16 bg-yellow-600/30 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Score de Qualidade</h3>
                <p className="text-slate-300 mb-4">Cada lead possui pontuação 0-100:</p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• Atualização dos dados (40%)</li>
                  <li>• Validação de email (30%)</li>
                  <li>• Validação de telefone (20%)</li>
                  <li>• Completude dos dados (10%)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Slide 6: Proposal */}
        {currentSlide === 6 && (
          <div>
            <h2 className="text-5xl font-bold mb-8 text-center">Proposta Comercial Exclusiva</h2>
            <p className="text-xl text-center text-cyan-400 mb-12">🎁 Oferta Early-Adopter</p>
            
            <div className="max-w-5xl mx-auto space-y-8">
              {/* Piloto Grátis */}
              <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border-2 border-cyan-500/50 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold mb-2">🚀 PILOTO 100% GRATUITO</h3>
                  <p className="text-lg text-slate-300">30 dias - SEM COMPROMISSO</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-cyan-400 mb-3">Incluído:</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> 300 leads para usar</li>
                      <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> Acesso total à plataforma</li>
                      <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> Filtros avançados</li>
                      <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> Export ilimitado</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-cyan-400 mb-3">Suporte:</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> Treinamento 4h</li>
                      <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> WhatsApp/Email prioritário</li>
                      <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> Consultoria estratégica</li>
                      <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> Sem cartão de crédito</li>
                    </ul>
                  </div>
                </div>
                
                <div className="text-center text-3xl font-bold text-cyan-400 border-t border-cyan-500/30 pt-6">
                  INVESTIMENTO: R$ 0,00
                </div>
              </div>

              {/* Implantação */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Implantação Premium</h3>
                    <p className="text-slate-400">Desconto 50% Early-Adopter</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500 line-through">De: R$ 5.970</div>
                    <div className="text-3xl font-bold text-emerald-400">R$ 2.985</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex gap-2 text-slate-300"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Setup completo</div>
                  <div className="flex gap-2 text-slate-300"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Treinamento 4h</div>
                  <div className="flex gap-2 text-slate-300"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Suporte 60 dias</div>
                  <div className="flex gap-2 text-slate-300"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> 100 leads bônus</div>
                </div>
              </div>

              {/* Mensalidade */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Plano Profissional SaaS</h3>
                    <p className="text-slate-400">Desconto 30% nos primeiros 6 meses</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500 line-through">De: R$ 697/mês</div>
                    <div className="text-3xl font-bold text-emerald-400">R$ 487/mês</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex gap-2 text-slate-300"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> 300 leads/mês inclusos</div>
                  <div className="flex gap-2 text-slate-300"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Extras: R$ 2,00/lead</div>
                  <div className="flex gap-2 text-slate-300"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Dashboard completo</div>
                  <div className="flex gap-2 text-slate-300"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Suporte prioritário</div>
                </div>
                <div className="mt-4 text-sm text-slate-400">
                  Mês 7 em diante: R$ 697/mês (preço normal)
                </div>
              </div>

              {/* Resumo */}
              <div className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 border-2 border-emerald-500/50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Resumo Financeiro - 6 Meses</h3>
                <div className="space-y-3 text-lg mb-6">
                  <div className="flex justify-between"><span className="text-slate-300">Piloto (30 dias):</span><span className="font-semibold">R$ 0,00</span></div>
                  <div className="flex justify-between"><span className="text-slate-300">Implantação:</span><span className="font-semibold">R$ 2.985</span></div>
                  <div className="flex justify-between"><span className="text-slate-300">6 Mensalidades:</span><span className="font-semibold">R$ 2.922</span></div>
                  <div className="border-t border-emerald-500/30 pt-3 flex justify-between text-2xl font-bold">
                    <span className="text-white">TOTAL:</span>
                    <span className="text-emerald-400">R$ 5.907</span>
                  </div>
                </div>
                <div className="text-center text-xl text-cyan-400">
                  💰 Economia total: R$ 3.195
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide 7: ROI */}
        {currentSlide === 7 && (
          <div>
            <h2 className="text-5xl font-bold mb-12 text-center">ROI Esperado</h2>
            
            <div className="max-w-5xl mx-auto">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Cenário Conservador</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-cyan-400 mb-4">Premissas:</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li>• Investimento: R$ 5.907 (6 meses)</li>
                      <li>• Uso mensal: 200 leads</li>
                      <li>• Taxa conversão: <strong>10%</strong></li>
                      <li>• Ticket médio: R$ 500/cliente</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-400 mb-4">Retorno por Mês:</h4>
                    <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm"><span>Leads usados:</span><span>200</span></div>
                      <div className="flex justify-between text-sm"><span>Conversão 10%:</span><span className="text-emerald-400">20 clientes</span></div>
                      <div className="flex justify-between text-sm"><span>Receita:</span><span className="text-emerald-400">R$ 10.000</span></div>
                      <div className="flex justify-between text-sm"><span>Custo LeadJur:</span><span className="text-red-400">R$ 487</span></div>
                      <div className="border-t border-slate-700 pt-2 mt-2 flex justify-between font-bold">
                        <span>Lucro/mês:</span>
                        <span className="text-emerald-400">R$ 9.513</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 border-2 border-emerald-500/50 rounded-2xl p-12 text-center">
                <div className="mb-6">
                  <div className="text-6xl font-bold text-emerald-400 mb-2">866%</div>
                  <div className="text-2xl text-slate-300">ROI em 6 meses</div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">R$ 57.078</div>
                    <div className="text-slate-400">Lucro total 6 meses</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">19 dias</div>
                    <div className="text-slate-400">Payback</div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Comparação: Manual vs LeadJur</h3>
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-800/50">
                      <tr className="border-b border-slate-700">
                        <th className="px-6 py-4 text-left text-sm font-semibold">Métrica</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Manual</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">LeadJur</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Ganho</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr>
                        <td className="px-6 py-4 text-slate-300">Tempo/busca</td>
                        <td className="px-6 py-4 text-red-400">8 horas</td>
                        <td className="px-6 py-4 text-emerald-400">40 seg</td>
                        <td className="px-6 py-4 text-emerald-400 font-semibold">99% ⬇️</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-slate-300">Custo/lead</td>
                        <td className="px-6 py-4 text-red-400">~R$ 15</td>
                        <td className="px-6 py-4 text-emerald-400">R$ 1,62</td>
                        <td className="px-6 py-4 text-emerald-400 font-semibold">89% ⬇️</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-slate-300">Precisão</td>
                        <td className="px-6 py-4 text-red-400">~60%</td>
                        <td className="px-6 py-4 text-emerald-400">95%</td>
                        <td className="px-6 py-4 text-emerald-400 font-semibold">58% ⬆️</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-slate-300">Leads/mês</td>
                        <td className="px-6 py-4 text-red-400">~30</td>
                        <td className="px-6 py-4 text-emerald-400">300+</td>
                        <td className="px-6 py-4 text-emerald-400 font-semibold">900% ⬆️</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide 8: Next Steps */}
        {currentSlide === 8 && (
          <div>
            <h2 className="text-5xl font-bold mb-12 text-center">Próximos Passos</h2>
            
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-xl font-bold">1</div>
                  Semana 1: Kickoff do Piloto
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-3">Segunda-feira</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Reunião alinhamento (1h)</li>
                      <li>• Criação da conta</li>
                      <li>• Tour pela plataforma</li>
                      <li>• Definição de objetivos</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-3">Terça/Quarta</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Treinamento completo (4h)</li>
                      <li>• Config. filtros padrão</li>
                      <li>• Primeira busca assistida</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-3">Quinta/Sexta</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Uso autônomo c/ suporte</li>
                      <li>• Dúvidas e ajustes</li>
                      <li>• Primeira exportação</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-xl font-bold">2</div>
                  Semanas 2-3: Uso Intensivo
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex gap-3"><CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0" /> Uso diário da plataforma</li>
                  <li className="flex gap-3"><CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0" /> Testes de diferentes filtros</li>
                  <li className="flex gap-3"><CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0" /> Exportação de leads reais</li>
                  <li className="flex gap-3"><CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0" /> Acompanhamento semanal (30min)</li>
                  <li className="flex gap-3"><CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0" /> Ajustes conforme necessidade</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 border border-emerald-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-xl font-bold">4</div>
                  Semana 4: Avaliação e Decisão
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-emerald-300 mb-3">Segunda-feira</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Coleta de métricas</li>
                      <li>• Análise de resultados</li>
                      <li>• Cálculo de ROI</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-300 mb-3">Quarta-feira</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Reunião feedback (1h)</li>
                      <li>• Apresentação melhorias</li>
                      <li>• Decisão de contratação</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-300 mb-3">Sexta (se contratar)</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Assinatura contrato</li>
                      <li>• Emissão NF implantação</li>
                      <li>• Início parceria oficial</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide 9: Guarantees */}
        {currentSlide === 9 && (
          <div>
            <h2 className="text-5xl font-bold mb-12 text-center">Garantias e Compromissos</h2>
            
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Garantias Técnicas</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" /> Uptime 99.5%</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" /> Suporte &lt;2h resposta</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" /> Dados atualizados mensalmente</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" /> LGPD 100% compliant</li>
                </ul>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Garantias Comerciais</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" /> Sem lock-in contratual</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" /> Sem taxa cancelamento</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" /> Dados exportados são seus</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" /> Treinamento sempre incluso</li>
                </ul>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="w-12 h-12 bg-cyan-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Durante o Piloto</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> Acesso total sem limitações</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> 300 leads reais, não demo</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> Sem compromisso</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" /> Decisão 100% sua</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Slide 10: FAQ */}
        {currentSlide === 10 && (
          <div>
            <h2 className="text-5xl font-bold mb-12 text-center">Perguntas Frequentes</h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 text-cyan-400">Preciso de cartão de crédito para o piloto?</h3>
                <p className="text-slate-300">Não! O piloto é 100% gratuito, sem necessidade de cartão.</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 text-cyan-400">Posso parcelar a implantação?</h3>
                <p className="text-slate-300">Sim, em até 2x sem juros.</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 text-cyan-400">E se eu não quiser continuar após o piloto?</h3>
                <p className="text-slate-300">Sem problemas! Sem taxas, sem compromisso.</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 text-cyan-400">Os dados são legais?</h3>
                <p className="text-slate-300">Sim, 100% provenientes de fontes públicas e legais (OAB, Diários Oficiais, sites profissionais).</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 text-cyan-400">Posso ser processado por usar?</h3>
                <p className="text-slate-300">Não. Nossos dados são de registro público e conformes à LGPD.</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 text-cyan-400">Funciona em mobile?</h3>
                <p className="text-slate-300">Sim! Design responsivo para celular, tablet e desktop.</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 text-cyan-400">E se os dados estiverem errados?</h3>
                <p className="text-slate-300">Reporta que corrigimos. Taxa de erro é menor que 5%.</p>
              </div>
            </div>
          </div>
        )}

        {/* Slide 11: Decision */}
        {currentSlide === 11 && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center">
            <h2 className="text-6xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Pronto para Começar?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 border-2 border-emerald-500/50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                  Aceito o Piloto Gratuito
                </h3>
                <div className="space-y-3 text-slate-300 mb-6">
                  <p className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-emerald-400" /> Assinar termo de piloto (hoje)</p>
                  <p className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-emerald-400" /> Receber credenciais (hoje)</p>
                  <p className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-emerald-400" /> Agendar treinamento (esta semana)</p>
                  <p className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-emerald-400" /> Começar a usar (esta semana)</p>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-500 rounded-lg font-semibold text-lg hover:from-emerald-700 hover:to-green-600 transition-all">
                  Começar Agora
                </button>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-400" />
                  Preciso de Mais Informações
                </h3>
                <div className="space-y-3 text-slate-300 mb-6">
                  <p className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-blue-400" /> Demo ao vivo personalizada</p>
                  <p className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-blue-400" /> Reunião com casos de sucesso</p>
                  <p className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-blue-400" /> Trial estendido (45 dias)</p>
                </div>
                <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold text-lg transition-all">
                  Agendar Reunião
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-8 max-w-3xl text-center">
              <h3 className="text-2xl font-bold mb-4">Contato</h3>
              <div className="space-y-3 text-slate-300">
                <p className="flex items-center justify-center gap-2"><Mail className="w-5 h-5 text-blue-400" /> contato@leadjur.com.br</p>
                <p className="flex items-center justify-center gap-2"><Phone className="w-5 h-5 text-blue-400" /> (11) 99999-9999</p>
              </div>
              <div className="mt-6 pt-6 border-t border-blue-500/30 text-sm text-slate-400">
                <p className="font-semibold text-cyan-400 mb-2">Lembre-se:</p>
                <p>✅ Piloto 100% grátis por 30 dias • ✅ 300 leads reais • ✅ Desconto exclusivo 50%</p>
                <p className="mt-3 text-yellow-400">⚠️ Tempo limitado para desconto early-adopter!</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Slide Navigation Dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-cyan-400 w-8' 
                : 'bg-slate-600 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>

      {/* Footer Info */}
      <div className="fixed bottom-4 right-6 text-sm text-slate-500">
        LeadJur © 2025 • Outubro
      </div>
    </div>
  );
}