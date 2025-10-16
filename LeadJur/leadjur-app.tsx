"use client";

import { useState, useEffect } from 'react';
import LoginPage from './login-page';
import RegisterPage from './register-page';
import SuccessPage from './success-page';
import Dashboard from './dashboard';
import { useAuth } from '../lib/useAuth';
import { logoutUser } from '../lib/authService';

type AppState = 'login' | 'register' | 'success' | 'dashboard';

export default function LeadJurApp() {
  const [appState, setAppState] = useState<AppState>('login');
  const [userEmail, setUserEmail] = useState('');
  const { user, profile, loading, authenticated } = useAuth();

  // Gerenciar estado baseado na autenticação
  useEffect(() => {
    if (!loading) {
      if (authenticated && user) {
        setAppState('dashboard');
      } else {
        setAppState('login');
      }
    }
  }, [loading, authenticated, user]);

  const handleLogin = () => {
    // O estado será atualizado automaticamente pelo useAuth
    console.log('Login realizado com sucesso');
  };

  const handleRegister = (email: string) => {
    setUserEmail(email);
    setAppState('success');
  };

  const handleSuccessContinue = () => {
    setAppState('dashboard');
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setAppState('login');
      setUserEmail('');
      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const showRegister = () => {
    setAppState('register');
  };

  const backToLogin = () => {
    setAppState('login');
  };

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen bg-law-navy-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-law-gold-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {appState === 'login' && (
        <LoginPage onLogin={handleLogin} onShowRegister={showRegister} />
      )}
      {appState === 'register' && (
        <RegisterPage onRegister={handleRegister} onBackToLogin={backToLogin} />
      )}
      {appState === 'success' && (
        <SuccessPage onContinue={handleSuccessContinue} userEmail={userEmail} />
      )}
      {appState === 'dashboard' && (
        <Dashboard onLogout={handleLogout} />
      )}
    </>
  );
}