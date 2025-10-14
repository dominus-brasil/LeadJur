"use client";

import { Search, Filter, Download, MapPin, Users, BarChart3, CreditCard, ChevronRight, Menu, X, Star, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function LeadJurPrototype() {
  const [currentScreen, setCurrentScreen] = useState<string>('login');
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  
  // Mock data
  const mockLeads = [
    { id: 1, name: 'Dr. Carlos Silva', oab: 'SP 123.456', area: 'Cível', city: 'São Paulo', email: 'carlos@adv.com', phone: '(11) 9999-9999', score: 95 },
    { id: 2, name: 'Dra. Marina Costa', oab: 'SP 234.567', area: 'Cível', city: 'São Paulo', email: 'marina@adv.com', phone: '(11) 8888-8888', score: 92 },
    { id: 3, name: 'Dr. Roberto Almeida', oab: 'SP 345.678', area: 'Cível', city: 'Campinas', email: 'roberto@adv.com', phone: '(19) 7777-7777', score: 88 },
    { id: 4, name: 'Dra. Ana Paula Souza', oab: 'SP 456.789', area: 'Cível', city: 'São Paulo', email: 'ana@adv.com', phone: '(11) 6666-6666', score: 90 },
  ];

  const toggleLead = (id: number) => {
    setSelectedLeads(prev => 
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      
      {/* Navigation */}
      <nav className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">L</span>
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">LeadJur</span>
          </div>
          
          {currentScreen !== 'login' && (
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => setCurrentScreen('dashboard')} className="text-slate-300 hover:text-white transition-colors">Dashboard</button>
              <button onClick={() => setCurrentScreen('search')} className="text-slate-300 hover:text-white transition-colors">Buscar Leads</button>
              <button className="text-slate-300 hover:text-white transition-colors">Créditos: <span className="text-cyan-400 font-semibold">250</span></button>
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-sm font-semibold">JS</div>
            </div>
          )}
        </div>
      </nav>

      {/* Screen Selector */}
      <div className="border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto">
          <button onClick={() => setCurrentScreen('login')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentScreen === 'login' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>Login</button>
          <button onClick={() => setCurrentScreen('dashboard')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentScreen === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>Dashboard</button>
          <button onClick={() => setCurrentScreen('search')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentScreen === 'search' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>Busca</button>
          <button onClick={() => setCurrentScreen('results')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentScreen === 'results' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>Resultados</button>
        </div>
      </div>

      {/* Login Screen */}
      {currentScreen === 'login' && (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">Prospecção Jurídica Inteligente</h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">Encontre advogados qualificados por área de atuação e região em segundos. Dados verificados e atualizados.</p>
              <div className="flex gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>95% de precisão</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>+50.000 leads</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>LGPD Compliant</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Acesse sua conta</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500" placeholder="seu@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Senha</label>
                  <input type="password" className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500" placeholder="••••••••" />
                </div>
                <button onClick={() => setCurrentScreen('dashboard')} className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02]">Entrar</button>
                <p className="text-center text-sm text-slate-400">Não tem conta? <a href="#" className="text-cyan-400 hover:text-cyan-300">Começar trial grátis</a></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Screen */}
      {currentScreen === 'dashboard' && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-slate-400">Visão geral da sua conta</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600/30 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-1">250</h3>
              <p className="text-sm text-slate-400">Créditos disponíveis</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-600/30 rounded-lg flex items-center justify-center">
                  <Search className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">142</h3>
              <p className="text-sm text-slate-400">Buscas este mês</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-cyan-600/30 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">89</h3>
              <p className="text-sm text-slate-400">Leads exportados</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 border border-emerald-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-600/30 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">94%</h3>
              <p className="text-sm text-slate-400">Taxa de precisão</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Áreas mais buscadas</h3>
              <div className="space-y-3">
                {[
                  { area: 'Direito Cível', percent: 42, color: 'bg-blue-500' },
                  { area: 'Direito Trabalhista', percent: 28, color: 'bg-cyan-500' },
                  { area: 'Direito Criminal', percent: 18, color: 'bg-purple-500' },
                  { area: 'Direito Empresarial', percent: 12, color: 'bg-pink-500' }
                ].map(item => (
                  <div key={item.area}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">{item.area}</span>
                      <span className="text-slate-400">{item.percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Buscas recentes</h3>
              <div className="space-y-3">
                {[
                  { query: 'Advogados Cível - São Paulo', time: 'Há 2 horas', results: 45 },
                  { query: 'Advogados Trabalhista - Campinas', time: 'Há 5 horas', results: 23 },
                  { query: 'Advogados Cível - Santos', time: 'Ontem', results: 18 }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
                    <div>
                      <p className="text-sm text-white font-medium">{item.query}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-cyan-400">{item.results}</p>
                      <p className="text-xs text-slate-500">resultados</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Screen */}
      {currentScreen === 'search' && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Buscar Leads</h1>
            <p className="text-slate-400">Configure os filtros e encontre advogados qualificados</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-cyan-400" />
                  Filtros de Busca
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Área de Atuação</label>
                    <select className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Direito Cível</option>
                      <option>Direito Trabalhista</option>
                      <option>Direito Criminal</option>
                      <option>Direito Empresarial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Estado</label>
                    <select className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>São Paulo</option>
                      <option>Rio de Janeiro</option>
                      <option>Minas Gerais</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Cidade</label>
                    <input type="text" className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: São Paulo" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Raio de busca</label>
                    <input type="range" min="1" max="50" defaultValue="10" className="w-full" />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>1km</span>
                      <span className="text-cyan-400 font-medium">10km</span>
                      <span>50km</span>
                    </div>
                  </div>

                  <button onClick={() => setCurrentScreen('results')} className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" />
                    Buscar Leads
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-sm text-slate-300">💡 <strong>Dica:</strong> Use raios menores para resultados mais precisos</p>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm h-full">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  Mapa de Busca
                </h3>
                <div className="bg-slate-800 rounded-lg h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-500">Visualização do mapa aparecerá aqui</p>
                    <p className="text-sm text-slate-600 mt-2">Integração com Google Maps API</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Screen */}
      {currentScreen === 'results' && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Resultados da Busca</h1>
              <p className="text-slate-400">Encontramos <span className="text-cyan-400 font-semibold">{mockLeads.length} advogados</span> na região selecionada</p>
            </div>
            <button 
              onClick={() => selectedLeads.length > 0 && alert(`Exportando ${selectedLeads.length} leads...`)}
              disabled={selectedLeads.length === 0}
              className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${selectedLeads.length > 0 ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
            >
              <Download className="w-5 h-5" />
              Exportar ({selectedLeads.length})
            </button>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700" onChange={(e) => setSelectedLeads(e.target.checked ? mockLeads.map(l => l.id) : [])} />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Nome</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">OAB</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Área</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Cidade</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Contato</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {mockLeads.map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <input 
                          type="checkbox" 
                          checked={selectedLeads.includes(lead.id)}
                          onChange={() => toggleLead(lead.id)}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-700" 
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-sm font-semibold">
                            {lead.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </div>
                          <span className="font-medium">{lead.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{lead.oab}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-medium">{lead.area}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{lead.city}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="text-slate-300">{lead.email}</div>
                          <div className="text-slate-500">{lead.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className={`font-semibold ${lead.score >= 90 ? 'text-green-400' : lead.score >= 80 ? 'text-yellow-400' : 'text-orange-400'}`}>{lead.score}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-slate-400">Mostrando {mockLeads.length} de {mockLeads.length} resultados</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">Anterior</button>
              <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium">1</button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">2</button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">Próximo</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/50 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">© 2025 LeadJur. Todos os direitos reservados.</p>
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-300 transition-colors">Termos</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-slate-300 transition-colors">LGPD</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}