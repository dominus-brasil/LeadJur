"use client";

import { useState } from 'react';
import LoginPage from './login-page';
import RegisterPage from './register-page';
import SuccessPage from './success-page';
import Dashboard from './dashboard';

type AppState = 'login' | 'register' | 'success' | 'dashboard';

export default function LeadJurApp() {
  const [appState, setAppState] = useState<AppState>('login');
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = () => {
    setAppState('dashboard');
  };

  const handleRegister = (email: string) => {
    setUserEmail(email);
    setAppState('success');
  };

  const handleSuccessContinue = () => {
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setAppState('login');
    setUserEmail('');
  };

  const showRegister = () => {
    setAppState('register');
  };

  const backToLogin = () => {
    setAppState('login');
  };

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