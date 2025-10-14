"use client";

import { Search, Target, Zap, Shield, TrendingUp, Users, CheckCircle, Star, ArrowRight, Clock, DollarSign, Award, BarChart3, Mail, Phone, Scale, Briefcase, FileText } from 'lucide-react';
import { useState } from 'react';

export default function LeadJurLanding() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div className="min-h-screen bg-law-navy-950 text-slate-100">
      
      {/* Navigation */}
      <nav className="border-b border-law-gold-900/30 backdrop-blur-xl bg-law-navy-950/95 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-8 h-8 text-law-gold-500" />
            <span className="text-2xl font-serif font-bold text-law-gold-500">LeadJur</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#beneficios" className="text-slate-300 hover:text-law-gold-400 transition-colors font-medium">Soluções</a>
            <a href="#planos" className="text-slate-300 hover:text-law-gold-400 transition-colors font-medium">Planos</a>
            <a href="#como-funciona" className="text-slate-300 hover:text-law-gold-400 transition-colors font-medium">Como Funciona</a>
            <button 
              onClick={() => setShowContactForm(true)} 
              className="px-6 py-2.5 bg-law-gold-600 hover:bg-law-gold-700 text-law-navy-950 rounded font-semibold transition-all law-shadow"
            >
              Falar com Consultor
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-law-navy-950 via-law-navy-900 to-law-navy-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'repeating-linear-gradient(90deg, #d4a12a 0px, transparent 1px, transparent 40px), repeating-linear-gradient(0deg, #d4a12a 0px, transparent 1px, transparent 40px)'}}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-law-gold-900/20 border border-law-gold-600/30 rounded mb-6">
                <Briefcase className="w-4 h-4 text-law-gold-400" />
                <span className="text-sm font-medium text-law-gold-300">Excelência em Inteligência Jurídica</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight text-slate-50">
                Conectando Profissionais do <span className="text-law-gold-400">Direito</span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Plataforma corporativa especializada em inteligência de dados jurídicos. Localize advogados qualificados com precisão, segurança e conformidade total com LGPD.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button 
                  onClick={() => {setShowContactForm(true); setSelectedPlan('trial');}} 
                  className="px-8 py-4 bg-law-gold-600 hover:bg-law-gold-700 text-law-navy-950 rounded font-semibold text-lg transition-all law-shadow-lg flex items-center justify-center gap-2"
                >
                  Solicitar Avaliação
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    const element = document.getElementById('planos');
                    if (element) element.scrollIntoView({behavior: 'smooth'});
                  }} 
                  className="px-8 py-4 bg-transparent border-2 border-law-gold-600 text-law-gold-400 hover:bg-law-gold-600/10 rounded font-semibold text-lg transition-all"
                >
                  Conhecer Soluções
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-6 text-sm pt-8 border-t border-law-gold-900/30">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-law-gold-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Dados verificados e atualizados</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-law-gold-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">+50.000 profissionais cadastrados</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-law-gold-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Conformidade LGPD</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-law-navy-900/80 backdrop-blur-xl border-2 border-law-gold-900/30 rounded-lg p-8 law-shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-5 bg-law-navy-800/50 border border-law-gold-900/20 rounded-lg">
                    <div className="w-14 h-14 bg-law-gold-900/30 rounded-lg flex items-center justify-center">
                      <Search className="w-7 h-7 text-law-gold-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-100 mb-1">Busca Especializada</div>
                      <div className="text-sm text-slate-400">Filtros avançados por área e jurisdição</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-5 bg-law-navy-800/50 border border-law-gold-900/20 rounded-lg">
                    <div className="w-14 h-14 bg-law-gold-900/30 rounded-lg flex items-center justify-center">
                      <Target className="w-7 h-7 text-law-gold-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-100 mb-1">Informações Qualificadas</div>
                      <div className="text-sm text-slate-400">Contatos verificados e atualizados</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-5 bg-law-navy-800/50 border border-law-gold-900/20 rounded-lg">
                    <div className="w-14 h-14 bg-law-gold-900/30 rounded-lg flex items-center justify-center">
                      <Shield className="w-7 h-7 text-law-gold-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-100 mb-1">Máxima Segurança</div>
                      <div className="text-sm text-slate-400">Proteção de dados e privacidade</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y border-law-gold-900/20 bg-law-navy-900/50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-law-gold-400 mb-2">50.000+</div>
              <div className="text-sm text-slate-400 font-medium">Profissionais Cadastrados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-law-gold-400 mb-2">97%</div>
              <div className="text-sm text-slate-400 font-medium">Precisão de Dados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-law-gold-400 mb-2">85%</div>
              <div className="text-sm text-slate-400 font-medium">Redução de Tempo</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-serif font-bold text-law-gold-400 mb-2">100%</div>
              <div className="text-sm text-slate-400 font-medium">Conformidade LGPD</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-24 bg-law-navy-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-slate-50">Diferenciais da Plataforma</h2>
            <p className="text-xl text-slate-400">Tecnologia e precisão a serviço do mercado jurídico</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-8 h-8" />,
                title: 'Dados Verificados',
                description: 'Informações constantemente atualizadas e validadas. Sistema inteligente de verificação garante a qualidade e confiabilidade dos registros.'
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: 'Segmentação Precisa',
                description: 'Filtros avançados por área de atuação, especialização, região e cidade. Encontre exatamente o perfil profissional que você precisa.'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Segurança Jurídica',
                description: 'Total conformidade com Lei Geral de Proteção de Dados. Processos auditados e certificados para máxima segurança da informação.'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Eficiência Operacional',
                description: 'Resultados instantâneos com busca otimizada. Exportação de dados em formatos corporativos com apenas um clique.'
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: 'Inteligência Analítica',
                description: 'Dashboard executivo com métricas e indicadores de performance. Insights estratégicos para otimização de resultados.'
              },
              {
                icon: <Briefcase className="w-8 h-8" />,
                title: 'Suporte Especializado',
                description: 'Equipe técnica dedicada com conhecimento jurídico. Treinamento completo e documentação profissional inclusos.'
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-law-navy-800/50 border-2 border-law-gold-900/20 hover:border-law-gold-700/40 rounded-lg p-8 transition-all law-shadow">
                <div className="w-16 h-16 bg-law-gold-900/30 rounded-lg flex items-center justify-center mb-6 text-law-gold-400">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-serif font-bold mb-3 text-slate-100">{benefit.title}</h3>
                <p className="text-slate-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-24 bg-law-navy-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-slate-50">Planos Corporativos</h2>
            <p className="text-xl text-slate-400">Soluções personalizadas para seu negócio</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            
            {/* SaaS Plan */}
            <div className="relative bg-law-navy-800/80 border-2 border-law-gold-600 rounded-lg p-8 law-shadow-lg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-law-gold-600 text-law-navy-950 rounded font-bold text-sm">
                RECOMENDADO
              </div>
              
              <div className="mb-8">
                <div className="text-sm text-law-gold-400 font-bold mb-2 tracking-wide">ASSINATURA MENSAL</div>
                <h3 className="text-3xl font-serif font-bold mb-4 text-slate-100">Plano Corporativo</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-serif font-bold text-law-gold-400">R$ 697</span>
                  <span className="text-slate-400 font-medium">/mês</span>
                </div>
                <p className="text-slate-300">Solução completa para operações contínuas</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  '300 consultas incluídas mensalmente',
                  'Consultas adicionais: R$ 2,00/unidade',
                  'Filtros especializados e geolocalização',
                  'Enriquecimento automatizado de dados',
                  'Exportação profissional (CSV/Excel)',
                  'Painel analítico executivo',
                  'Integração via API (em desenvolvimento)',
                  'Suporte técnico prioritário'
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-law-gold-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => {setShowContactForm(true); setSelectedPlan('saas');}} 
                className="w-full py-4 bg-law-gold-600 hover:bg-law-gold-700 text-law-navy-950 rounded font-bold text-lg transition-all law-shadow"
              >
                Contratar Plano
              </button>
            </div>

            {/* Credits Plan */}
            <div className="bg-law-navy-800/50 border-2 border-law-gold-900/30 rounded-lg p-8 law-shadow">
              <div className="mb-8">
                <div className="text-sm text-law-gold-400 font-bold mb-2 tracking-wide">PAGAMENTO ÚNICO</div>
                <h3 className="text-3xl font-serif font-bold mb-4 text-slate-100">Créditos Pré-Pagos</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-serif font-bold text-slate-100">R$ 479</span>
                  <span className="text-slate-400 font-medium">pacote</span>
                </div>
                <p className="text-slate-300">Flexibilidade sob demanda, sem compromisso</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  '200 consultas no pacote',
                  'Valor por consulta: R$ 2,40',
                  'Validade de 90 dias corridos',
                  'Exportação em formatos padrão',
                  'Filtros de busca essenciais',
                  'Sistema de enriquecimento prioritário',
                  'Atendimento via email corporativo',
                  'Sem taxas recorrentes'
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-law-gold-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => {setShowContactForm(true); setSelectedPlan('credits');}} 
                className="w-full py-4 bg-law-navy-700 hover:bg-law-navy-600 border-2 border-law-gold-900/30 hover:border-law-gold-700/50 text-slate-100 rounded font-bold text-lg transition-all"
              >
                Adquirir Créditos
              </button>
            </div>
          </div>

          {/* Trial Banner */}
          <div className="bg-law-navy-800/80 border-2 border-law-gold-900/40 rounded-lg p-10 text-center max-w-4xl mx-auto law-shadow">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-8 h-8 text-law-gold-400" />
              <h3 className="text-2xl font-serif font-bold text-slate-100">Período de Avaliação - 30 Dias</h3>
            </div>
            <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
              Experimente o Plano Corporativo completo por 30 dias, sem necessidade de cartão de crédito. Inclui 300 consultas para avaliação completa da plataforma.
            </p>
            <button 
              onClick={() => {setShowContactForm(true); setSelectedPlan('trial');}} 
              className="px-10 py-4 bg-law-gold-600 hover:bg-law-gold-700 text-law-navy-950 rounded font-bold text-lg transition-all law-shadow"
            >
              Iniciar Avaliação Gratuita
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="como-funciona" className="py-24 bg-law-navy-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-slate-50">Metodologia de Trabalho</h2>
            <p className="text-xl text-slate-400">Processo simplificado e eficiente</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Credenciamento', description: 'Registro institucional com validação de identidade em processo seguro e certificado.' },
              { step: '02', title: 'Parametrização', description: 'Definição de critérios de busca por especialização, jurisdição e demais filtros disponíveis.' },
              { step: '03', title: 'Processamento', description: 'Sistema realiza consulta em base de dados verificada retornando informações qualificadas.' },
              { step: '04', title: 'Integração', description: 'Exportação de dados em formatos corporativos para integração com sistemas internos.' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-law-gold-900/30 border-2 border-law-gold-600 rounded-lg flex items-center justify-center mx-auto mb-6 text-3xl font-serif font-bold text-law-gold-400">
                  {item.step}
                </div>
                <h3 className="text-xl font-serif font-bold mb-3 text-slate-100">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-law-navy-900 via-law-navy-800 to-law-navy-900 border-y border-law-gold-900/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Scale className="w-16 h-16 text-law-gold-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-50">Eleve o Padrão de Sua Operação</h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Una-se aos profissionais que já otimizaram 85% do tempo em processos de inteligência de dados jurídicos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {setShowContactForm(true); setSelectedPlan('trial');}} 
              className="px-10 py-4 bg-law-gold-600 hover:bg-law-gold-700 text-law-navy-950 rounded font-bold text-lg transition-all law-shadow-lg"
            >
              Solicitar Avaliação
            </button>
            <button 
              onClick={() => {setShowContactForm(true); setSelectedPlan('demo');}} 
              className="px-10 py-4 bg-transparent border-2 border-law-gold-600 text-law-gold-400 hover:bg-law-gold-600/10 rounded font-bold text-lg transition-all"
            >
              Agendar Apresentação
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-law-navy-900 border-2 border-law-gold-900/40 rounded-lg p-8 max-w-md w-full law-shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-serif font-bold text-slate-50">
                {selectedPlan === 'trial' ? 'Solicitar Avaliação' : 
                 selectedPlan === 'saas' ? 'Plano Corporativo' :
                 selectedPlan === 'credits' ? 'Créditos Pré-Pagos' : 'Agendar Apresentação'}
              </h3>
              <button onClick={() => setShowContactForm(false)} className="text-slate-400 hover:text-law-gold-400 text-2xl font-bold">
                ✕
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-law-navy-800 border-2 border-law-gold-900/30 rounded focus:outline-none focus:border-law-gold-600 text-slate-100" 
                  placeholder="João Silva Santos" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Email Corporativo</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-law-navy-800 border-2 border-law-gold-900/30 rounded focus:outline-none focus:border-law-gold-600 text-slate-100" 
                  placeholder="joao.silva@empresa.com.br" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Telefone Comercial</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 bg-law-navy-800 border-2 border-law-gold-900/30 rounded focus:outline-none focus:border-law-gold-600 text-slate-100" 
                  placeholder="(11) 99999-9999" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Empresa/Instituição</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-law-navy-800 border-2 border-law-gold-900/30 rounded focus:outline-none focus:border-law-gold-600 text-slate-100" 
                  placeholder="Silva & Associados Advocacia" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-law-gold-600 hover:bg-law-gold-700 text-law-navy-950 rounded font-bold text-lg transition-all law-shadow mt-6"
              >
                {selectedPlan === 'trial' ? 'Solicitar Acesso' : 
                 selectedPlan === 'demo' ? 'Confirmar Agendamento' : 'Enviar Solicitação'}
              </button>

              <p className="text-xs text-slate-500 text-center mt-4">
                Ao enviar, você concorda com os Termos de Uso e Política de Privacidade
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-law-gold-900/20 bg-law-navy-950 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-10 h-10 text-law-gold-500" />
                <span className="text-2xl font-serif font-bold text-law-gold-500">LeadJur</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Plataforma corporativa de inteligência em dados jurídicos
              </p>
            </div>

            <div>
              <h4 className="font-serif font-bold mb-4 text-slate-200">Soluções</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <a href="#" className="block hover:text-law-gold-400 transition-colors">Funcionalidades</a>
                <a href="#" className="block hover:text-law-gold-400 transition-colors">Planos Corporativos</a>
                <a href="#" className="block hover:text-law-gold-400 transition-colors">API Corporativa</a>
                <a href="#" className="block hover:text-law-gold-400 transition-colors">Integrações</a>
              </div>
            </div>

            <div>
              <h4 className="font-serif font-bold mb-4 text-slate-200">Institucional</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <a href="#" className="block hover:text-law-gold-400 transition-colors">Sobre Nós</a>
                <a href="#" className="block hover:text-law-gold-400 transition-colors">Blog Corporativo</a>
                <a href="#" className="block hover:text-law-gold-400 transition-colors">Cases de Sucesso</a>
                <a href="#" className="block hover:text-law-gold-400 transition-colors">Contato</a>
              </div>
            </div>

            <div>
              <h4 className="font-serif font-bold mb-4 text-slate-200">Conformidade Legal</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <a href="#" className="block hover:text-law-gold-400 transition-colors">Termos de Uso</a>
                <a href="#" className="block hover:text-law-gold-400 transition-colors">Política de Privacidade</a>
                <a href="#" className="block hover:text-law-gold-400 transition-colors">Conformidade LGPD</a>
                <a href="#" className="block hover:text-law-gold-400 transition-colors">Política de Cookies</a>
              </div>
            </div>
          </div>

          <div className="border-t border-law-gold-900/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">© 2025 LeadJur. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-law-gold-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-law-gold-400 transition-colors">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}