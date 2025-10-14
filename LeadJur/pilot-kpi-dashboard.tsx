import { TrendingUp, Users, Search, Download, Award, AlertCircle, CheckCircle, Target, Calendar, BarChart3 } from 'lucide-react';
import { useState } from 'react';

export default function PilotKPIDashboard() {
  const [currentWeek, setCurrentWeek] = useState(1);
  
  // Mock data - em produção viriam do backend
  const pilotData = {
    clientName: "Dr. João Silva - Perícia Técnica",
    startDate: "15/10/2025",
    week: currentWeek,
    
    metrics: {
      usageRate: currentWeek === 1 ? 71 : currentWeek === 2 ? 78 : currentWeek === 3 ? 85 : 92,
      leadsExported: currentWeek === 1 ? 45 : currentWeek === 2 ? 120 : currentWeek === 3 ? 185 : 265,
      searchesCount: currentWeek === 1 ? 12 : currentWeek === 2 ? 28 : currentWeek === 3 ? 45 : 67,
      nps: currentWeek === 1 ? 0 : currentWeek === 2 ? 0 : currentWeek === 3 ? 8 : 9,
      qualityScore: currentWeek === 1 ? 0 : currentWeek === 2 ? 7 : currentWeek === 3 ? 8 : 9,
      filterDiversity: currentWeek === 1 ? 2 : currentWeek === 2 ? 4 : currentWeek === 3 ? 5 : 5,
      supportTickets: currentWeek === 1 ? 2 : currentWeek === 2 ? 1 : currentWeek === 3 ? 1 : 0
    }
  };

  const calculateConversionScore = () => {
    const m = pilotData.metrics;
    let score = 0;
    
    // Taxa de Uso (20 pts)
    if (m.usageRate >= 90) score += 20;
    else if (m.usageRate >= 80) score += 15;
    else if (m.usageRate >= 60) score += 10;
    else score += 5;
    
    // Leads Exportados (20 pts)
    if (m.leadsExported >= 250) score += 20;
    else if (m.leadsExported >= 200) score += 15;
    else if (m.leadsExported >= 150) score += 10;
    else if (m.leadsExported >= 100) score += 5;
    
    // NPS (20 pts) - só semana 4
    if (currentWeek === 4) {
      if (m.nps >= 9) score += 20;
      else if (m.nps >= 7) score += 15;
      else if (m.nps >= 5) score += 10;
    }
    
    // Qualidade (15 pts) - só semana 3+
    if (currentWeek >= 3) {
      if (m.qualityScore >= 9) score += 15;
      else if (m.qualityScore >= 7) score += 10;
      else if (m.qualityScore >= 5) score += 5;
    }
    
    // Diversidade (10 pts)
    if (m.filterDiversity === 5) score += 10;
    else if (m.filterDiversity === 4) score += 7;
    else if (m.filterDiversity >= 3) score += 5;
    
    // Suporte (10 pts)
    if (m.supportTickets >= 2 && m.supportTickets <= 5) score += 10;
    else if (m.supportTickets === 1) score += 7;
    else score += 3;
    
    // Feedback (5 pts) - só semana 4
    if (currentWeek === 4) score += 5;
    
    return score;
  };

  const score = calculateConversionScore();
  const probability = score >= 80 ? 'ALTA' : score >= 60 ? 'MÉDIA' : score >= 40 ? 'BAIXA' : 'MUITO BAIXA';
  const probabilityColor = score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-yellow-400' : score >= 40 ? 'text-orange-400' : 'text-red-400';
  const probabilityBg = score >= 80 ? 'from-emerald-600/20 to-green-600/20 border-emerald-500/30' : 
                        score >= 60 ? 'from-yellow-600/20 to-orange-600/20 border-yellow-500/30' : 
                        score >= 40 ? 'from-orange-600/20 to-red-600/20 border-orange-500/30' : 
                        'from-red-600/20 to-rose-600/20 border-red-500/30';

  const getMetricStatus = (value: number, min: number, ideal: number) => {
    if (value >= ideal) return { color: 'text-emerald-400', icon: '🟢', bg: 'bg-emerald-600/20' };
    if (value >= min) return { color: 'text-yellow-400', icon: '🟡', bg: 'bg-yellow-600/20' };
    return { color: 'text-red-400', icon: '🔴', bg: 'bg-red-600/20' };
  };

  const weekGoals: Record<number, { usage: number; leads: number; searches: number }> = {
    1: { usage: 70, leads: 20, searches: 10 },
    2: { usage: 70, leads: 50, searches: 20 },
    3: { usage: 70, leads: 150, searches: 30 },
    4: { usage: 80, leads: 200, searches: 40 }
  };

  const redFlags = [];
  const greenFlags = [];

  if (pilotData.metrics.usageRate < 60 && currentWeek >= 2) redFlags.push("Taxa de uso abaixo do mínimo");
  if (pilotData.metrics.leadsExported < 50 && currentWeek >= 3) redFlags.push("Poucos leads exportados");
  if (pilotData.metrics.supportTickets >= 10) redFlags.push("Muitos tickets de suporte");
  
  if (pilotData.metrics.usageRate >= 90) greenFlags.push("Uso diário consistente");
  if (pilotData.metrics.leadsExported >= 250) greenFlags.push("Alto volume de leads exportados");
  if (pilotData.metrics.nps >= 9 && currentWeek === 4) greenFlags.push("NPS excelente (Promotor)");
  if (pilotData.metrics.filterDiversity === 5) greenFlags.push("Explora todas funcionalidades");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard do Piloto</h1>
              <p className="text-slate-400">{pilotData.clientName}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">Início do Piloto</div>
              <div className="text-xl font-semibold text-cyan-400">{pilotData.startDate}</div>
            </div>
          </div>

          {/* Week Selector */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(week => (
              <button
                key={week}
                onClick={() => setCurrentWeek(week)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  currentWeek === week 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                Semana {week}
              </button>
            ))}
          </div>
        </div>

        {/* Conversion Score */}
        <div className={`bg-gradient-to-br ${probabilityBg} border rounded-2xl p-8 mb-8`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400 mb-2">Score de Conversão</div>
              <div className="text-6xl font-bold mb-2">{score}<span className="text-3xl text-slate-400">/100</span></div>
              <div className="text-xl">Probabilidade: <span className={`font-bold ${probabilityColor}`}>{probability}</span></div>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-slate-900/50 flex items-center justify-center mb-4">
                <Target className={`w-16 h-16 ${probabilityColor}`} />
              </div>
              <div className="text-sm text-slate-400">
                {score >= 80 ? '>70% chance' : score >= 60 ? '40-70% chance' : score >= 40 ? '20-40% chance' : '<20% chance'}
              </div>
            </div>
          </div>
        </div>

        {/* Primary KPIs */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-blue-400" />
              <span className="text-2xl">{getMetricStatus(pilotData.metrics.usageRate, 60, 80).icon}</span>
            </div>
            <div className="text-sm text-slate-400 mb-1">Taxa de Uso</div>
            <div className={`text-3xl font-bold ${getMetricStatus(pilotData.metrics.usageRate, 60, 80).color}`}>
              {pilotData.metrics.usageRate}%
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Meta: {weekGoals[currentWeek].usage}%+ | Ideal: 80%+
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Download className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl">{getMetricStatus(pilotData.metrics.leadsExported, weekGoals[currentWeek].leads, 200).icon}</span>
            </div>
            <div className="text-sm text-slate-400 mb-1">Leads Exportados</div>
            <div className={`text-3xl font-bold ${getMetricStatus(pilotData.metrics.leadsExported, weekGoals[currentWeek].leads, 200).color}`}>
              {pilotData.metrics.leadsExported}
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Meta: {weekGoals[currentWeek].leads}+ | Ideal: 200+
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Search className="w-8 h-8 text-purple-400" />
              <span className="text-2xl">{getMetricStatus(pilotData.metrics.searchesCount, weekGoals[currentWeek].searches, 50).icon}</span>
            </div>
            <div className="text-sm text-slate-400 mb-1">Buscas Realizadas</div>
            <div className={`text-3xl font-bold ${getMetricStatus(pilotData.metrics.searchesCount, weekGoals[currentWeek].searches, 50).color}`}>
              {pilotData.metrics.searchesCount}
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Meta: {weekGoals[currentWeek].searches}+ | Ideal: 50+
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl">
                {pilotData.metrics.filterDiversity === 5 ? '🟢' : pilotData.metrics.filterDiversity >= 3 ? '🟡' : '🔴'}
              </span>
            </div>
            <div className="text-sm text-slate-400 mb-1">Diversidade de Filtros</div>
            <div className={`text-3xl font-bold ${pilotData.metrics.filterDiversity === 5 ? 'text-emerald-400' : pilotData.metrics.filterDiversity >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>
              {pilotData.metrics.filterDiversity}/5
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Meta: 3+ | Ideal: 5 (todos)
            </div>
          </div>
        </div>

        {/* Secondary KPIs */}
        {currentWeek >= 3 && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8 text-yellow-400" />
                <span className="text-2xl">
                  {pilotData.metrics.nps >= 9 ? '🟢' : pilotData.metrics.nps >= 7 ? '🟡' : pilotData.metrics.nps > 0 ? '🔴' : '⚪'}
                </span>
              </div>
              <div className="text-sm text-slate-400 mb-1">NPS (Net Promoter Score)</div>
              <div className={`text-3xl font-bold ${pilotData.metrics.nps >= 9 ? 'text-emerald-400' : pilotData.metrics.nps >= 7 ? 'text-yellow-400' : pilotData.metrics.nps > 0 ? 'text-red-400' : 'text-slate-500'}`}>
                {pilotData.metrics.nps > 0 ? `${pilotData.metrics.nps}/10` : 'Pendente'}
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Coletado na semana 4
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-8 h-8 text-blue-400" />
                <span className="text-2xl">
                  {pilotData.metrics.qualityScore >= 9 ? '🟢' : pilotData.metrics.qualityScore >= 7 ? '🟡' : pilotData.metrics.qualityScore > 0 ? '🔴' : '⚪'}
                </span>
              </div>
              <div className="text-sm text-slate-400 mb-1">Qualidade Percebida</div>
              <div className={`text-3xl font-bold ${pilotData.metrics.qualityScore >= 9 ? 'text-emerald-400' : pilotData.metrics.qualityScore >= 7 ? 'text-yellow-400' : pilotData.metrics.qualityScore > 0 ? 'text-red-400' : 'text-slate-500'}`}>
                {pilotData.metrics.qualityScore > 0 ? `${pilotData.metrics.qualityScore}/10` : 'Pendente'}
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Coletado na semana 3+
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-cyan-400" />
                <span className="text-2xl">
                  {pilotData.metrics.supportTickets >= 2 && pilotData.metrics.supportTickets <= 5 ? '🟢' : '🟡'}
                </span>
              </div>
              <div className="text-sm text-slate-400 mb-1">Tickets de Suporte</div>
              <div className={`text-3xl font-bold ${pilotData.metrics.supportTickets >= 2 && pilotData.metrics.supportTickets <= 5 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                {pilotData.metrics.supportTickets}
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Ideal: 2-5 tickets
              </div>
            </div>
          </div>
        )}

        {/* Alerts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Red Flags */}
          {redFlags.length > 0 && (
            <div className="bg-gradient-to-br from-red-600/20 to-rose-600/20 border border-red-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-bold text-red-300">Red Flags Identificados</h3>
              </div>
              <ul className="space-y-2">
                {redFlags.map((flag, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-300">
                    <span className="text-red-400">⚠️</span>
                    {flag}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-red-500/30">
                <p className="text-sm text-red-300">Ação requerida: Contato urgente com o cliente</p>
              </div>
            </div>
          )}

          {/* Green Flags */}
          {greenFlags.length > 0 && (
            <div className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 border border-emerald-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-emerald-300">Green Flags Identificados</h3>
              </div>
              <ul className="space-y-2">
                {greenFlags.map((flag, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400">✅</span>
                    {flag}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-emerald-500/30">
                <p className="text-sm text-emerald-300">Ação: Antecipar proposta comercial</p>
              </div>
            </div>
          )}

          {redFlags.length === 0 && greenFlags.length === 0 && (
            <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
              <p className="text-slate-400">Nenhum alerta identificado até o momento</p>
            </div>
          )}
        </div>

        {/* Weekly Progress */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-6">Progresso Semanal</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(week => (
              <div key={week} className={`flex items-center gap-4 ${week > currentWeek ? 'opacity-30' : ''}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                  week === currentWeek ? 'bg-blue-600 text-white' : week < currentWeek ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-500'
                }`}>
                  {week < currentWeek ? '✓' : week}
                </div>
                <div className="flex-1">
                  <div className="font-semibold mb-1">
                    Semana {week} - {week === 1 ? 'Onboarding' : week === 2 ? 'Exploração' : week === 3 ? 'Uso Intensivo' : 'Avaliação'}
                  </div>
                  <div className="text-sm text-slate-400">
                    {week === 1 ? 'Treinamento inicial e primeiras buscas' :
                     week === 2 ? 'Exploração de funcionalidades avançadas' :
                     week === 3 ? 'Uso intensivo e validação de valor' :
                     'Coleta de feedback e decisão de compra'}
                  </div>
                </div>
                {week <= currentWeek && (
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    week < currentWeek ? 'bg-emerald-600/20 text-emerald-400' : 'bg-blue-600/20 text-blue-400'
                  }`}>
                    {week < currentWeek ? 'Concluída' : 'Em andamento'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Plan */}
        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Próximas Ações Recomendadas</h3>
          <div className="space-y-3">
            {currentWeek === 1 && (
              <>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Acompanhar conclusão do treinamento inicial (4h)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Garantir que realize pelo menos 10 buscas na primeira semana</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Check-in rápido no dia 3 para validar experiência inicial</span>
                </div>
              </>
            )}
            {currentWeek === 2 && (
              <>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Incentivar uso de filtros avançados (mapa, raio, múltiplas áreas)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Validar qualidade dos primeiros leads exportados</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Acompanhamento semanal de 30min agendado</span>
                </div>
              </>
            )}
            {currentWeek === 3 && (
              <>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Coletar feedback intermediário sobre qualidade dos dados</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Entender resultados obtidos (conversões, se houver)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Preparar proposta comercial personalizada</span>
                </div>
              </>
            )}
            {currentWeek === 4 && (
              <>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Agendar reunião de feedback final (1 hora)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Enviar questionário de avaliação completo</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Apresentar proposta comercial com descontos early-adopter</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Fechar conversão ou entender motivos de não-conversão</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}