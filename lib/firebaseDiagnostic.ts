import { auth, db } from './firebase';

// Função para verificar variáveis de ambiente
export const checkEnvironmentVariables = () => {
  console.log('=== VERIFICAÇÃO DE VARIÁVEIS DE AMBIENTE ===');
  
  // Usar a mesma lógica que funciona no envTest.ts
  const vars = {
    API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  };

  console.log('Variáveis detectadas:', vars);
  
  const missingVars: string[] = [];

  Object.entries(vars).forEach(([key, value]) => {
    if (!value || value === 'undefined') {
      missingVars.push(key);
      console.error(`❌ NEXT_PUBLIC_FIREBASE_${key}: AUSENTE`);
    } else {
      console.log(`✅ NEXT_PUBLIC_FIREBASE_${key}: ${value.substring(0, 20)}...`);
    }
  });

  if (missingVars.length > 0) {
    console.error('Variáveis de ambiente ausentes:', missingVars);
    console.error('Soluções:');
    console.error('1. Verifique se o arquivo .env.local existe');
    console.error('2. Reinicie o servidor de desenvolvimento');
    console.error('3. Verifique se não há espaços extras nas variáveis');
    return false;
  }

  console.log('✅ Todas as variáveis de ambiente estão configuradas');
  return true;
};

// Função para testar a configuração do Firebase
export const testFirebaseConnection = async () => {
  try {
    console.log('=== TESTE DE CONFIGURAÇÃO FIREBASE ===');
    
    // Testar configuração básica
    console.log('Auth instance:', auth);
    console.log('Firestore instance:', db);
    console.log('Project ID:', auth.app.options.projectId);
    console.log('Auth Domain:', auth.app.options.authDomain);
    
    return true;
  } catch (error) {
    console.error('Erro na configuração do Firebase:', error);
    return false;
  }
};

// Executar diagnóstico completo
export const runFirebaseDiagnostic = async () => {
  console.log('🚀 Iniciando diagnóstico do Firebase...');
  
  // Verificar variáveis de ambiente
  const envCheck = checkEnvironmentVariables();
  
  // Verificar configuração
  const configCheck = await testFirebaseConnection();
  
  if (envCheck && configCheck) {
    console.log('🎉 Firebase está configurado corretamente!');
    return true;
  } else {
    console.log('⚠️ Problemas detectados na configuração do Firebase.');
    return false;
  }
};