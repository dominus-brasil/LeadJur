// Teste simples para verificar variáveis de ambiente
export const testEnvVars = () => {
  console.log('=== TESTE DE VARIÁVEIS DE AMBIENTE ===');
  console.log('process.env:', Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_FIREBASE')));
  
  const vars = {
    API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  };
  
  console.log('Variáveis detectadas:', vars);
  
  Object.entries(vars).forEach(([key, value]) => {
    if (value) {
      console.log(`✅ ${key}: ${value.substring(0, 20)}...`);
    } else {
      console.log(`❌ ${key}: AUSENTE`);
    }
  });
  
  return vars;
};