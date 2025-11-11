# 🚀 Configuração no Render

## Passo a Passo Completo

### 1️⃣ Criar PostgreSQL Database

1. Dashboard Render → **New** → **PostgreSQL**
2. Nome: `bookvault-db`
3. Plan: **Free**
4. Clique em **Create Database**
5. **Anote as informações de conexão** (vão aparecer no dashboard)

---

### 2️⃣ Criar Web Service

1. Dashboard → **New** → **Web Service**
2. Conecte o repositório: `aintegrare/book`
3. Branch: **`claude/code-study-analysis-011CV1AAxpXudZmgeBYzTh3K`** ⚠️ IMPORTANTE!
4. Configuração:
   - **Name:** `bookvault`
   - **Region:** Escolha o mais próximo
   - **Environment:** Docker
   - **Instance Type:** Free

---

### 3️⃣ Configurar Variáveis de Ambiente

No seu Web Service → **Environment**, adicione estas variáveis:

#### ✅ Obrigatórias:

```bash
APP_NAME=BookVault
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:XXXXX  # Ver instruções abaixo
LOG_CHANNEL=stack
LOG_LEVEL=error
```

#### 🔑 Como Gerar APP_KEY:

**Opção A - Localmente:**
```bash
php artisan key:generate --show
```

**Opção B - Online:**
1. Acesse: https://generate-random.org/laravel-key-generator
2. Copie a chave gerada (formato: `base64:XXXXX`)

#### 📦 Database (use as informações do PostgreSQL criado):

**Opção 1 - URL única:**
```bash
DATABASE_URL=postgresql://user:password@host:5432/database
```

**Opção 2 - Variáveis separadas:**
```bash
DB_CONNECTION=pgsql
DB_HOST=seu-host.render.com
DB_PORT=5432
DB_DATABASE=bookvault_db
DB_USERNAME=bookvault_user
DB_PASSWORD=sua-senha-aqui
```

💡 **Pegue essas informações no dashboard do PostgreSQL que você criou**

#### 🔧 Cache e Session:

```bash
CACHE_DRIVER=file
SESSION_DRIVER=file
SESSION_LIFETIME=120
QUEUE_CONNECTION=sync
```

#### 🌐 URL da Aplicação:

```bash
APP_URL=https://bookvault.onrender.com
```

*(Ajuste para o domínio real que o Render fornecer)*

---

### 4️⃣ Deploy

1. Depois de configurar tudo, clique em **Manual Deploy** → **Deploy latest commit**
2. Aguarde ~5-8 minutos (primeira vez demora mais)
3. Acompanhe nos **Logs**

---

### 5️⃣ Criar Usuário Admin

Após o deploy finalizar com sucesso:

1. No Render Dashboard → Seu Web Service → **Shell**
2. Execute:

```bash
php artisan make:filament-user
```

Preencha:
- **Name:** Seu Nome
- **Email:** seu@email.com
- **Password:** Senha Segura

---

### 6️⃣ Acessar a Aplicação

🌐 **URLs:**
- Site: `https://seu-app.onrender.com`
- Admin: `https://seu-app.onrender.com/admin`
- Biblioteca: `https://seu-app.onrender.com/library`

---

## 🐛 Troubleshooting

### Erro 500

**Verifique nos Logs:**
```
Dashboard → Seu Service → Logs
```

**Causas Comuns:**

1. **APP_KEY não configurado**
   - Gere: `php artisan key:generate --show`
   - Adicione em Environment

2. **Database não conectado**
   - Verifique se criou o PostgreSQL
   - Confirme as credenciais em Environment

3. **Migrations não rodaram**
   - Veja nos logs se apareceu "Running migrations..."
   - Se não, rode manualmente no Shell:
     ```bash
     php artisan migrate --force
     ```

### Build Falhou

**"ext-intl not found":**
- ✅ Já está no Dockerfile, force rebuild:
  - Settings → Clear Build Cache & Deploy

**"Port already in use":**
- ✅ Dockerfile usa $PORT automaticamente

### Site Carrega Mas Sem Estilos

**CSS não carrega:**
1. Verifique se `npm run build` rodou nos logs
2. Force rebuild com cache limpo

---

## 📊 Monitoramento

### Logs em Tempo Real:
```
Dashboard → Logs
```

### Métricas:
```
Dashboard → Metrics
```

### Health Check:
O Render verifica automaticamente se sua aplicação está respondendo.

---

## 💰 Plano Free - Limitações

⚠️ **Free tier:**
- Instance hiberna após 15 min sem requisições
- Primeiro acesso após hibernar pode demorar ~30s (cold start)
- 750 horas/mês gratuitas
- 100GB de tráfego/mês

💡 **Dica:** Se precisar que fique sempre ativo, upgrade para plano pago ($7/mês)

---

## 🔄 Atualizações

**Deploy Automático:**
- Qualquer push no branch `claude/code-study-analysis-011CV1AAxpXudZmgeBYzTh3K` faz deploy automático

**Deploy Manual:**
```
Dashboard → Manual Deploy → Deploy latest commit
```

---

## ✅ Checklist Final

- [ ] PostgreSQL database criado
- [ ] Web Service criado com branch correto
- [ ] APP_KEY configurado
- [ ] Database URL/credenciais configuradas
- [ ] Deploy finalizado sem erros
- [ ] Logs mostram "Starting server on port..."
- [ ] Site carrega (pode demorar 30s no free tier)
- [ ] Usuário admin criado
- [ ] Login no /admin funciona
- [ ] Biblioteca acessível em /library
- [ ] Material Design 3 carregando (cores, sombras, tipografia)

---

## 📞 Suporte

**Documentação Oficial do Render:**
https://render.com/docs

**Problemas com o BookVault:**
Verifique os logs e o arquivo INSTALLATION.md no repositório.
