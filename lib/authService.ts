import { auth, db } from './firebaseAlt'; // Usando configuração alternativa temporariamente
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc,
  serverTimestamp 
} from 'firebase/firestore';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  company: string;
  profession: string;
  phone: string;
  createdAt: any;
  lastLogin?: any;
}

// Registrar novo usuário
export const registerUser = async (userData: {
  email: string;
  password: string;
  fullName: string;
  company: string;
  profession: string;
  phone: string;
}): Promise<{ user: User; profile: UserProfile }> => {
  try {
    console.log('Iniciando registro do usuário:', userData.email);
    
    // Criar usuário no Firebase Auth
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth, 
      userData.email, 
      userData.password
    );
    
    console.log('Usuário criado no Firebase Auth:', userCredential.user.uid);
    const user = userCredential.user;

    // Criar perfil do usuário no Firestore
    const userProfile: UserProfile = {
      id: user.uid,
      fullName: userData.fullName,
      email: userData.email,
      company: userData.company,
      profession: userData.profession,
      phone: userData.phone,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    };

    console.log('Salvando perfil no Firestore:', userProfile);

    // Salvar perfil no Firestore
    await setDoc(doc(db, 'users', user.uid), userProfile);
    
    console.log('Perfil salvo com sucesso no Firestore');

    return { user, profile: userProfile };
  } catch (error: any) {
    console.error('Erro detalhado no registro:', error);
    console.error('Código do erro:', error.code);
    console.error('Mensagem do erro:', error.message);
    
    // Traduzir erros comuns do Firebase
    switch (error.code) {
      case 'auth/email-already-in-use':
        throw new Error('Este email já está sendo usado por outra conta.');
      case 'auth/invalid-email':
        throw new Error('Email inválido.');
      case 'auth/weak-password':
        throw new Error('A senha deve ter pelo menos 6 caracteres.');
      case 'auth/network-request-failed':
        throw new Error('Erro de conexão. Verifique sua internet.');
      case 'auth/too-many-requests':
        throw new Error('Muitas tentativas. Tente novamente mais tarde.');
      default:
        throw new Error(`Erro ao criar conta: ${error.message}`);
    }
  }
};

// Fazer login
export const loginUser = async (email: string, password: string): Promise<{ user: User; profile: UserProfile }> => {
  try {
    // Autenticar usuário
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    
    const user = userCredential.user;

    // Buscar perfil do usuário no Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('Perfil do usuário não encontrado.');
    }

    const userProfile = userDoc.data() as UserProfile;

    // Atualizar último login
    await setDoc(doc(db, 'users', user.uid), {
      ...userProfile,
      lastLogin: serverTimestamp()
    }, { merge: true });

    return { user, profile: userProfile };
  } catch (error: any) {
    console.error('Erro ao fazer login:', error);
    
    // Traduzir erros comuns do Firebase
    switch (error.code) {
      case 'auth/user-not-found':
        throw new Error('Usuário não encontrado.');
      case 'auth/wrong-password':
        throw new Error('Senha incorreta.');
      case 'auth/invalid-email':
        throw new Error('Email inválido.');
      case 'auth/user-disabled':
        throw new Error('Esta conta foi desabilitada.');
      case 'auth/too-many-requests':
        throw new Error('Muitas tentativas de login. Tente novamente mais tarde.');
      default:
        throw new Error('Erro ao fazer login. Verifique suas credenciais.');
    }
  }
};

// Fazer logout
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw new Error('Erro ao sair da conta.');
  }
};

// Observar mudanças no estado de autenticação
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Buscar perfil do usuário atual
export const getCurrentUserProfile = async (user: User): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    return null;
  }
};

// Verificar se o usuário está autenticado
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};