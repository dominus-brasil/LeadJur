// Configuração Firebase alternativa - valores hardcoded temporários
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuração direta (temporária para debug)
const firebaseConfig = {
  apiKey: "AIzaSyBI9JuMN_hcMq3cqMQN-3AItaCUDgj_2nQ",
  authDomain: "leadjur-de479.firebaseapp.com",
  projectId: "leadjur-de479",
  storageBucket: "leadjur-de479.firebasestorage.app",
  messagingSenderId: "238365764633",
  appId: "1:238365764633:web:02442df7433add6e388e88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;