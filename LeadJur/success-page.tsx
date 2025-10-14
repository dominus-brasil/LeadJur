"use client";

import { CheckCircle, ArrowRight, Mail, Calendar, Target } from 'lucide-react';

interface SuccessPageProps {
  onContinue: () => void;
  userEmail: string;
}

export default function SuccessPage({ onContinue, userEmail }: SuccessPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:24px_24px]"></div>
      
      <div className="relative w-full max-w-lg text-center">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mb-8">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold mb-4">Conta Criada com Sucesso! 🎉</h1>
        <p className="text-xl text-slate-300 mb-8">
          Bem-vindo à <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent font-semibold">LeadJur</span>!
        </p>

        {/* Email Confirmation */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-blue-400" />
            <div className="text-left">
              <h3 className="font-semibold">Email de Confirmação Enviado</h3>
              <p className="text-sm text-slate-400">{userEmail}</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 text-left">
            Enviamos um email de confirmação para ativar sua conta. Verifique sua caixa de entrada e spam.
          </p>
        </div>

        {/* Next Steps */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            Próximos Passos
          </h3>
          <div className="space-y-3 text-sm text-left">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center text-xs font-bold text-blue-400">1</div>
              <span className="text-slate-300">Confirme seu email clicando no link enviado</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-cyan-600/20 rounded-full flex items-center justify-center text-xs font-bold text-cyan-400">2</div>
              <span className="text-slate-300">Faça login na plataforma</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-emerald-600/20 rounded-full flex items-center justify-center text-xs font-bold text-emerald-400">3</div>
              <span className="text-slate-300">Comece sua busca por advogados qualificados</span>
            </div>
          </div>
        </div>

        {/* Trial Information */}
        <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-6 h-6 text-blue-400" />
            <h3 className="font-semibold">Trial Gratuito Ativado</h3>
          </div>
          <p className="text-sm text-slate-300 mb-4">
            Você tem <span className="font-semibold text-blue-400">7 dias gratuitos</span> para explorar todas as funcionalidades da plataforma.
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900/30 rounded-lg p-3">
              <div className="font-medium text-cyan-400">100 Buscas</div>
              <div className="text-slate-400">Incluídas no trial</div>
            </div>
            <div className="bg-slate-900/30 rounded-lg p-3">
              <div className="font-medium text-emerald-400">Sem Compromisso</div>
              <div className="text-slate-400">Cancele quando quiser</div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-cyan-600 transition-all flex items-center justify-center gap-2 transform hover:scale-105"
        >
          Continuar para o Dashboard
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-xs text-slate-500 mt-4">
          Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
        </p>
      </div>
    </div>
  );
}