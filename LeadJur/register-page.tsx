"use client";

import { useState } from 'react';
import { Eye, EyeOff, CheckCircle, ArrowLeft, Scale } from 'lucide-react';
import InputMask from 'react-input-mask';

interface RegisterPageProps {
  onRegister: (email: string) => void;
  onBackToLogin: () => void;
}

export default function RegisterPage({ onRegister, onBackToLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    profession: '',
    phone: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não conferem';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Empresa é obrigatória';
    }

    if (!formData.profession.trim()) {
      newErrors.profession = 'Profissão é obrigatória';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone deve ter pelo menos 10 dígitos';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Você deve aceitar os termos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onRegister(formData.email);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    let formattedValue = value;
    
    if (typeof value === 'string') {
      switch (field) {
        case 'fullName':
        case 'company':
        case 'profession':
          formattedValue = value.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
          break;
        case 'email':
          formattedValue = value.toLowerCase();
          break;
      }
    }
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    if (field === 'confirmPassword' || field === 'password') {
      const updatedData = { ...formData, [field]: formattedValue };
      if (field === 'confirmPassword' && updatedData.password && updatedData.confirmPassword) {
        if (updatedData.password !== updatedData.confirmPassword) {
          setErrors(prev => ({ ...prev, confirmPassword: 'Senhas não conferem' }));
        } else {
          setErrors(prev => ({ ...prev, confirmPassword: '' }));
        }
      } else if (field === 'password' && updatedData.confirmPassword) {
        if (updatedData.password !== updatedData.confirmPassword) {
          setErrors(prev => ({ ...prev, confirmPassword: 'Senhas não conferem' }));
        } else {
          setErrors(prev => ({ ...prev, confirmPassword: '' }));
        }
      }
    } else if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-law-navy-950 text-slate-100 flex items-center justify-center p-6">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{backgroundImage: 'repeating-linear-gradient(90deg, #d4a12a 0px, transparent 1px, transparent 40px), repeating-linear-gradient(0deg, #d4a12a 0px, transparent 1px, transparent 40px)'}}></div>
      </div>
      
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={onBackToLogin}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-law-navy-800/80 hover:bg-law-navy-700 border-2 border-law-gold-900/30 hover:border-law-gold-700/50 rounded text-slate-300 hover:text-slate-100 transition-all duration-200 backdrop-blur-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Retornar ao Login
        </button>
      </div>
      
      <div className="relative w-full max-w-lg mt-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Scale className="w-10 h-10 text-law-gold-500" />
            <span className="text-2xl font-serif font-bold text-law-gold-500">LeadJur</span>
          </div>
          <h1 className="text-3xl font-serif font-bold mb-3 text-slate-50">Solicitar Acesso</h1>
          <p className="text-slate-400">Preencha os dados para análise corporativa</p>
        </div>

        <div className="bg-law-navy-900/80 backdrop-blur-xl border-2 border-law-gold-900/30 rounded-lg p-8 law-shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-bold text-slate-300 mb-2">Nome Completo *</label>
              <input type="text" id="fullName" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} className="w-full px-4 py-3 bg-law-navy-800 border-2 border-law-gold-900/30 rounded focus:outline-none focus:border-law-gold-600 text-slate-100 placeholder-slate-500 transition-all" placeholder="João Silva Santos" />
              {errors.fullName && <p className="text-red-400 text-sm mt-1 font-medium">{errors.fullName}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-300 mb-2">Email Corporativo *</label>
              <input type="email" id="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full px-4 py-3 bg-law-navy-800 border-2 border-law-gold-900/30 rounded focus:outline-none focus:border-law-gold-600 text-slate-100 placeholder-slate-500 transition-all" placeholder="joao.silva@empresa.com.br" />
              {errors.email && <p className="text-red-400 text-sm mt-1 font-medium">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-300 mb-2">Senha *</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} id="password" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} className="w-full px-4 py-3 bg-law-navy-800 border-2 border-law-gold-900/30 rounded focus:outline-none focus:border-law-gold-600 text-slate-100 placeholder-slate-500 pr-12 transition-all" placeholder="" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-law-gold-400 transition-colors">{showPassword ? <Eye className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1 font-medium">{errors.password}</p>}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-slate-300 mb-2">Confirmar Senha *</label>
              <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} className="w-full px-4 py-3 bg-law-navy-800 border-2 border-law-gold-900/30 rounded focus:outline-none focus:border-law-gold-600 text-slate-100 placeholder-slate-500 pr-12 transition-all" placeholder="" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-law-gold-400 transition-colors">{showConfirmPassword ? <Eye className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1 font-medium">{errors.confirmPassword}</p>}
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-bold text-slate-300 mb-2">Empresa/Instituição *</label>
              <input type="text" id="company" value={formData.company} onChange={(e) => handleInputChange('company', e.target.value)} className="w-full px-4 py-3 bg-law-navy-800 border-2 border-law-gold-900/30 rounded focus:outline-none focus:border-law-gold-600 text-slate-100 placeholder-slate-500 transition-all" placeholder="Silva & Associados Advocacia" />
              {errors.company && <p className="text-red-400 text-sm mt-1 font-medium">{errors.company}</p>}
            </div>
            
            <div>
              <label htmlFor="profession" className="block text-sm font-bold text-slate-300 mb-2">Cargo/Profissão *</label>
              <input type="text" id="profession" value={formData.profession} onChange={(e) => handleInputChange('profession', e.target.value)} className="w-full px-4 py-3 bg-law-navy-800 border-2 border-law-gold-900/30 rounded focus:outline-none focus:border-law-gold-600 text-slate-100 placeholder-slate-500 transition-all" placeholder="Advogado Sócio" />
              {errors.profession && <p className="text-red-400 text-sm mt-1 font-medium">{errors.profession}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-slate-300 mb-2">Telefone Comercial *</label>
              <InputMask mask="(99) 99999-9999" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)}>{() => (<input type="tel" id="phone" className="w-full px-4 py-3 bg-law-navy-800 border-2 border-law-gold-900/30 rounded focus:outline-none focus:border-law-gold-600 text-slate-100 placeholder-slate-500 transition-all" placeholder="(11) 99999-9999" />)}</InputMask>
              {errors.phone && <p className="text-red-400 text-sm mt-1 font-medium">{errors.phone}</p>}
            </div>
            
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.acceptTerms} onChange={(e) => handleInputChange('acceptTerms', e.target.checked)} className="w-5 h-5 mt-0.5 rounded border-law-gold-900/30 bg-law-navy-800 text-law-gold-600 focus:ring-law-gold-600 focus:ring-offset-0" />
                <span className="text-sm text-slate-300 leading-relaxed">Declaro aceitar os Termos de Uso e Política de Privacidade, e autorizo o recebimento de comunicações institucionais.</span>
              </label>
              {errors.acceptTerms && <p className="text-red-400 text-sm mt-1 font-medium">{errors.acceptTerms}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="w-full py-4 bg-law-gold-600 hover:bg-law-gold-700 text-law-navy-950 rounded font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 law-shadow mt-6">
              {isLoading ? (<><div className="w-5 h-5 border-2 border-law-navy-950/30 border-t-law-navy-950 rounded-full animate-spin"></div>Processando...</>) : (<><CheckCircle className="w-5 h-5" />Enviar Solicitação</>)}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-law-gold-900/20">
            <p className="text-center text-sm text-slate-400">Já possui credenciais? <button onClick={onBackToLogin} className="text-law-gold-400 hover:text-law-gold-300 transition-colors font-bold">Acessar plataforma</button></p>
          </div>
        </div>
      </div>
    </div>
  );
}
