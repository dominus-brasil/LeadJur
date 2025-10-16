# Configuração do Firebase para LeadJur

## Como configurar o Firebase:

### 1. Acesse o Console do Firebase
- Vá para: https://console.firebase.google.com/
- Faça login com sua conta Google

### 2. Selecione seu projeto
- Clique no projeto que você já criou

### 3. Obtenha as configurações
- Clique no ícone de engrenagem (⚙️) > **Project Settings**
- Na aba **General**, role para baixo até **Your apps**
- Se ainda não tem um app web, clique em **Add app** e selecione **Web** (`</>`)
- Copie as configurações que aparecem

### 4. Configure as variáveis de ambiente
- Abra o arquivo `.env.local` na raiz do projeto
- Substitua os valores com suas configurações:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

### 5. Configure o Firestore
- No console do Firebase, vá em **Firestore Database**
- Se ainda não está criado, clique em **Create database**
- Escolha o modo de produção ou teste
- Selecione uma localização (recomendo `southamerica-east1` para Brasil)

### 6. Configure as regras de segurança (opcional)
Por padrão, o Firestore não permite leitura/escrita sem autenticação. Para testes, você pode usar:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permite leitura e escrita para todos (APENAS PARA DESENVOLVIMENTO)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ IMPORTANTE**: Em produção, configure regras de segurança adequadas!

### 7. Teste a conexão
- Execute `npm run dev`
- Abra o console do navegador (F12)
- Adicione um lead pelo formulário
- Verifique no console do Firebase se o documento foi criado na coleção `leads`

## Estrutura dos dados no Firestore:

```
leads/ (coleção)
├── documento1/
│   ├── name: "João Silva"
│   ├── company: "Silva & Associados"
│   ├── specialty: "Direito Civil"
│   ├── city: "São Paulo"
│   ├── state: "SP"
│   ├── oab: "OAB/SP 123.456"
│   ├── phone: "(11) 99999-9999"
│   ├── email: "joao@silva.com"
│   ├── address: "Rua A, 123 - Centro"
│   ├── stage: "no-contact"
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp
```

## Próximos passos:

1. **Integre com o dashboard**: Modifique o `dashboard.tsx` para usar `leadService`
2. **Adicione autenticação**: Para múltiplos usuários
3. **Configure regras de segurança**: Para proteger os dados
4. **Adicione índices**: Para consultas mais rápidas