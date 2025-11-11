# 🚀 Guia de Deploy no Netlify

## Opção 1: Deploy via Interface Web (Recomendado)

### Passo 1: Preparar o Repositório
1. Certifique-se de que todas as alterações foram commitadas e enviadas para o GitHub:
   ```bash
   git status
   git push
   ```

### Passo 2: Conectar ao Netlify
1. Acesse [https://app.netlify.com](https://app.netlify.com)
2. Faça login com sua conta (GitHub, GitLab, etc.)
3. Clique em **"Add new site"** > **"Import an existing project"**

### Passo 3: Configurar o Deploy
1. Selecione seu provedor Git (GitHub)
2. Escolha o repositório `book`
3. Configure as opções de build:
   - **Branch to deploy:** `claude/digital-library-setup-011CV2uqNNTP4LZhtBhwy7my` (ou sua branch principal)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Clique em **"Deploy site"**

### Passo 4: Aguardar Deploy
- O Netlify irá:
  - Instalar dependências (`npm install`)
  - Executar o build (`npm run build`)
  - Publicar a pasta `dist`
- Tempo estimado: 2-3 minutos

### Passo 5: Acessar sua Aplicação
- URL temporária: `https://random-name-123456.netlify.app`
- Você pode customizar o domínio em **Site settings** > **Domain management**

---

## Opção 2: Deploy via CLI

### Pré-requisitos
```bash
# Instalar Netlify CLI globalmente
npm install -g netlify-cli
```

### Passo 1: Login
```bash
netlify login
```

### Passo 2: Inicializar
```bash
netlify init
```
- Siga o wizard de configuração
- Ou conecte a um site existente

### Passo 3: Deploy
```bash
# Deploy de produção
netlify deploy --prod

# Ou deploy de preview
netlify deploy
```

---

## Configuração Automática

O arquivo `netlify.toml` já está configurado:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

Isso garante:
- ✅ Build automático
- ✅ React Router funciona corretamente (SPA redirects)
- ✅ Node.js versão 20

---

## Domínio Customizado

### Adicionar seu próprio domínio:
1. Vá para **Site settings** > **Domain management**
2. Clique em **"Add custom domain"**
3. Digite seu domínio (ex: `biblioteca.seudominio.com`)
4. Configure os DNS records conforme instruções:
   - **CNAME:** `your-site-name.netlify.app`
   - Ou use **Netlify DNS** para gerenciamento automático

---

## Variáveis de Ambiente

Se precisar adicionar variáveis de ambiente:
1. Vá para **Site settings** > **Environment variables**
2. Adicione suas variáveis
3. Faça redeploy

---

## Deploy Automático

### Configurar CI/CD:
- Por padrão, o Netlify faz deploy automático quando você faz push para a branch configurada
- Você pode configurar:
  - Deploy previews para Pull Requests
  - Deploy apenas de branches específicas
  - Notificações de deploy

---

## Verificar Status do Deploy

### Via Interface Web:
- Acesse **Deploys** no dashboard
- Veja logs completos de cada deploy
- Rollback para versões anteriores se necessário

### Via CLI:
```bash
netlify status
netlify open
```

---

## Troubleshooting

### Build falha:
1. Verifique logs no dashboard do Netlify
2. Teste localmente:
   ```bash
   npm run build
   npm run preview
   ```

### Rotas 404:
- Verifique se `netlify.toml` tem a configuração de redirects
- O arquivo já está configurado corretamente!

### Estilos não carregam:
- Certifique-se de que o build foi concluído com sucesso
- Limpe cache do navegador

---

## URLs Úteis

- **Dashboard:** https://app.netlify.com
- **Documentação:** https://docs.netlify.com
- **Status:** https://www.netlifystatus.com
- **Community:** https://community.netlify.com

---

## Próximos Passos

Após o deploy, teste:
1. ✅ Navegação entre páginas
2. ✅ Sistema de códigos de acesso (DC2025, ALICE123, KAFKA99)
3. ✅ Leitor de livros
4. ✅ Modo escuro/claro
5. ✅ Marcadores e anotações
6. ✅ Progresso de leitura

---

🎉 **Parabéns! Sua biblioteca digital está no ar!**

Compartilhe o link e os códigos de acesso com seus usuários.
