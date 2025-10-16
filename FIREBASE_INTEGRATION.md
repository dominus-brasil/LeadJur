# LeadJur - Integração Completa com Firebase

Este projeto está agora totalmente integrado com o Firebase Firestore, substituindo todos os dados fictícios por dados reais do banco de dados.

## 🔄 Mudanças Implementadas

### 1. **Novos Serviços Criados**

#### **lawyerService.ts**
- Gerenciamento completo de advogados no Firebase
- Busca com filtros (nome, especialidade, cidade, estado)
- CRUD completo para advogados
- Função para adicionar advogados de exemplo

#### **activityService.ts**
- Registro de atividades e histórico de interações
- Log automático de mudanças de estágio
- Registro de contatos revelados, ligações e e-mails
- Histórico completo por lead

#### **statsService.ts**
- Cálculo de estatísticas em tempo real
- Taxa de conversão automática
- Distribuição por estágios
- Contagem de contatos revelados

#### **seedDatabase.ts**
- Utilitário para popular o banco com dados de exemplo
- Funções para adicionar leads, advogados e atividades
- Verificação para não duplicar dados

### 2. **Painel Atualizado**

#### **Substituições de Dados Fictícios:**
- ✅ Estatísticas do painel agora são calculadas em tempo real
- ✅ Busca de advogados conectada ao Firebase
- ✅ Leads carregados e salvos no banco
- ✅ Drag & drop atualiza o banco e registra atividades
- ✅ Adição de leads registra atividades
- ✅ Contatos revelados são registrados

#### **Funcionalidades Integradas:**
- ✅ Carregamento automático de leads do Firebase
- ✅ Busca real de advogados com filtros
- ✅ Estatísticas dinâmicas baseadas em dados reais
- ✅ Registro de atividades para cada ação
- ✅ Auto-população com dados de exemplo se banco estiver vazio

## 🚀 Como Usar

### 1. **Configuração do Firebase**
Certifique-se de que as variáveis de ambiente estão configuradas no `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

### 2. **Popular o Banco (Primeira Vez)**
O sistema automaticamente adiciona dados de exemplo quando detecta que o banco está vazio. Use a página de configuração:

1. Acesse: `http://localhost:3001/setup`
2. Clique em **"🔧 Testar Firebase"** para verificar conexão
3. Clique em **"🚀 Popular Banco"** para adicionar dados
4. Clique em **"🔍 Verificar Dados"** para ver estatísticas

### 3. **Estrutura dos Dados**

#### **Leads**
```typescript
interface Lead {
  id: string;
  name: string;
  company: string;
  specialty: string;
  city: string;
  state: string;
  oab: string;
  phone?: string;
  email?: string;
  address?: string;
  stage: 'no-contact' | 'contact-attempt' | 'contact-made' | 
         'meeting-scheduled' | 'negotiating' | 'closed' | 
         'future-negotiations' | 'lost' | 'cancelled';
}
```

#### **Advogados**
```typescript
interface Lawyer {
  id: string;
  name: string;
  oab: string;
  specialty: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  address: string;
  firm: string;
  experience: string;
  status: 'active' | 'inactive';
}
```

#### **Atividades**
```typescript
interface Activity {
  id: string;
  leadId: string;
  type: 'stage_change' | 'contact_revealed' | 'note_added' | 
        'call_made' | 'email_sent' | 'meeting_scheduled';
  title: string;
  description: string;
  fromStage?: string;
  toStage?: string;
  createdAt: Timestamp;
}
```

## 📊 Funcionalidades Implementadas

### **Painel Principal**
- ✅ Estatísticas em tempo real
- ✅ Funil de vendas com dados reais
- ✅ Drag & drop funcional
- ✅ Indicadores de carregamento

### **Busca de Advogados**
- ✅ Filtros por nome, especialidade, cidade, estado
- ✅ Resultados do Firebase
- ✅ Revelação de contatos registrada
- ✅ Adição de leads ao funil

### **Gerenciamento de Leads**
- ✅ CRUD completo
- ✅ Mudança de estágios
- ✅ Histórico de atividades
- ✅ Formulário de adição manual

### **Atividades e Histórico**
- ✅ Log automático de todas as ações
- ✅ Histórico por lead
- ✅ Timestamps de todas as atividades

## 🔧 Configuração de Permissões

Se você receber erro "Missing or insufficient permissions":

1. **Acesse o Console Firebase**: https://console.firebase.google.com
2. **Selecione o projeto**: leadjur-de479
3. **Vá em**: Firestore Database → Regras
4. **Substitua as regras por**:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
5. **Clique em**: "Publicar"

## 🎯 Próximos Passos Sugeridos

1. **Autenticação de Usuários**: Implementar login/registro
2. **Relatórios Avançados**: Gráficos e métricas detalhadas
3. **Notificações**: Alertas para follow-ups
4. **Integração de E-mail**: Envio real de e-mails
5. **Telefonia**: Integração com APIs de telefonia
6. **Exportação**: CSV/Excel dos dados
7. **Filtros Avançados**: Busca mais sofisticada
8. **Painel Personalizado**: Widgets configuráveis

## 🔧 Comandos Úteis

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Verificar tipos TypeScript
npx tsc --noEmit
```

## 📝 Páginas Disponíveis

- **`/`**: Painel principal com dashboard executivo
- **`/setup`**: Página de configuração e população do banco
- **Funcionalidades**:
  - Busca de advogados
  - Gerenciamento de leads
  - Estatísticas em tempo real
  - Histórico de atividades

## 🐛 Solução de Problemas

### **Erro de Permissões**
- Use a página `/setup` para diagnosticar
- Configure as regras do Firestore (ver seção acima)

### **Performance**
- Com muitos dados, considere implementar paginação
- Use índices no Firestore para consultas complexas

### **Dados não Aparecem**
- Verifique as configurações no `.env.local`
- Use "🔍 Verificar Dados" na página setup
- Confira o console do navegador para erros

---

**Status**: ✅ **Totalmente funcional com dados reais do Firebase em português brasileiro**