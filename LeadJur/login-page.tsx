"use client";

import { useState, useEffect } from 'react';
import { Eye, EyeOff, Shield, Scale, Zap } from 'lucide-react';
import { loginUser } from '../lib/authService';
import { testEnvVars } from '../lib/envTest';

interface LoginPageProps {
  onLogin: () => void;
  onShowRegister: () => void;
}

export default function LoginPage({ onLogin, onShowRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Testar variáveis de ambiente quando a página carrega
  useEffect(() => {
    console.log('=== TESTANDO VARIÁVEIS DE AMBIENTE ===');
    testEnvVars();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const { user, profile } = await loginUser(email, password);
      console.log('Login realizado com sucesso:', { user: user.email, profile: profile.fullName });
      
      // Salvar dados do usuário no localStorage se "lembrar" estiver marcado
      if (rememberMe) {
        localStorage.setItem('rememberUser', 'true');
        localStorage.setItem('userEmail', email);
      } else {
        localStorage.removeItem('rememberUser');
        localStorage.removeItem('userEmail');
      }
      
      onLogin();
    } catch (error: any) {
      console.error('Erro no login:', error);
      setError(error.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-law-navy-950 text-slate-100 flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{backgroundImage: 'repeating-linear-gradient(90deg, #d4a12a 0px, transparent 1px, transparent 40px), repeating-linear-gradient(0deg, #d4a12a 0px, transparent 1px, transparent 40px)'}}></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <Scale className="w-12 h-12 text-law-gold-500" />
            <span className="text-3xl font-serif font-bold text-law-gold-500">LeadJur</span>
          </div>
          <h1 className="text-3xl font-serif font-bold mb-1 text-slate-50">Acesso Corporativo/Pessoal</h1>
          <p className="text-slate-400">Insira suas credenciais para acessar a plataforma</p>
        </div>

        {/* Login Form */}
        <div className="bg-law-navy-900/80 backdrop-blur-xl border-2 border-law-gold-900/30 rounded-lg p-8 law-shadow-lg">
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border-2 border-red-600/30 rounded-lg">
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-300 mb-2">
                Email Corporativo/Pessoal
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-law-navy-800 border-2 border-law-gold-900/30 rounded focus:outline-none focus:border-law-gold-600 text-slate-100 placeholder-slate-500 transition-all"
                placeholder="seu.email@empresa.com.br"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-law-navy-800 border-2 border-law-gold-900/30 rounded focus:outline-none focus:border-law-gold-600 text-slate-100 placeholder-slate-500 pr-12 transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-law-gold-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-law-gold-900/30 bg-law-navy-800 text-law-gold-600 focus:ring-law-gold-600 focus:ring-offset-0"
                />
                <span className="text-sm text-slate-300">Manter conectado</span>
              </label>
              
              <button
                type="button"
                className="text-sm text-law-gold-400 hover:text-law-gold-300 transition-colors font-medium"
              >
                Recuperar senha
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-law-gold-600 hover:bg-law-gold-700 text-law-navy-950 rounded font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 law-shadow"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-law-navy-950/30 border-t-law-navy-950 rounded-full animate-spin"></div>
                  Autenticando...
                </>
              ) : (
                "Acessar Plataforma"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-law-gold-900/20">
            <p className="text-center text-sm text-slate-400">
              Não possui credenciais?{' '}
              <button 
                onClick={onShowRegister}
                className="text-law-gold-400 hover:text-law-gold-300 transition-colors font-bold"
              >
                Solicitar acesso
              </button>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-law-navy-900/50 backdrop-blur-sm border-2 border-law-gold-900/20 rounded-lg p-4 text-center">
            <Shield className="w-6 h-6 text-law-gold-400 mx-auto mb-2" />
            <div className="text-sm font-bold mb-1 text-slate-200">Segurança</div>
            <div className="text-xs text-slate-400">Conformidade LGPD</div>
          </div>
          
          <div className="bg-law-navy-900/50 backdrop-blur-sm border-2 border-law-gold-900/20 rounded-lg p-4 text-center">
            <Zap className="w-6 h-6 text-law-gold-400 mx-auto mb-2" />
            <div className="text-sm font-bold mb-1 text-slate-200">Eficiência</div>
            <div className="text-xs text-slate-400">Resultados instantâneos</div>
          </div>
        </div>
      </div>
    </div>
  );
}