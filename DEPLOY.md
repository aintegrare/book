# 🚀 Deploy do BookVault

## Opção 1: Railway (Recomendado) ⭐

### Passo a Passo:

1. **Crie uma conta no Railway**
   - Acesse: https://railway.app
   - Faça login com GitHub

2. **Crie um novo projeto**
   - Clique em "New Project"
   - Selecione "Deploy from GitHub repo"
   - Escolha o repositório `aintegrare/book`

3. **Adicione PostgreSQL**
   - No projeto, clique em "+ New"
   - Selecione "Database" → "PostgreSQL"
   - Railway vai criar e conectar automaticamente

4. **Configure as Variáveis de Ambiente**
   No Railway, adicione estas variáveis:
   ```
   APP_NAME=BookVault
   APP_ENV=production
   APP_DEBUG=false
   APP_KEY=base64:SUA_KEY_AQUI
   APP_URL=https://seu-app.railway.app

   DB_CONNECTION=pgsql
   # Railway preenche automaticamente:
   # DATABASE_URL, PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD
   ```

5. **Gerar APP_KEY**
   Execute localmente:
   ```bash
   php artisan key:generate --show
   ```
   Copie a chave gerada e adicione em `APP_KEY`

6. **Deploy Automático**
   - Railway vai detectar que é Laravel
   - Vai rodar migrations automaticamente
   - Seu site estará disponível em: `https://seu-app.railway.app`

7. **Criar Usuário Admin**
   No Railway CLI ou Terminal do Railway:
   ```bash
   php artisan make:filament-user
   ```

---

## Opção 2: Render

1. Acesse: https://render.com
2. New → Web Service
3. Conecte seu repositório GitHub
4. Configure:
   - **Build Command:** `composer install && npm install && npm run build`
   - **Start Command:** `php artisan serve --host=0.0.0.0 --port=$PORT`
5. Adicione PostgreSQL Database
6. Configure variáveis de ambiente (mesmo do Railway)

---

## Opção 3: Heroku

```bash
# Instalar Heroku CLI
heroku login
heroku create bookvault-app

# Adicionar PostgreSQL
heroku addons:create heroku-postgresql:mini

# Configurar variáveis
heroku config:set APP_KEY=$(php artisan key:generate --show)
heroku config:set APP_ENV=production
heroku config:set APP_DEBUG=false

# Deploy
git push heroku claude/code-study-analysis-011CV1AAxpXudZmgeBYzTh3K:main

# Rodar migrations
heroku run php artisan migrate --force

# Criar admin
heroku run php artisan make:filament-user
```

---

## 📋 Checklist Pós-Deploy

- [ ] Acessar o site
- [ ] Fazer login no admin (/admin)
- [ ] Criar livros e capítulos
- [ ] Criar usuários leitores
- [ ] Conceder acessos aos livros
- [ ] Testar leitura
- [ ] Verificar Material Design está funcionando
- [ ] Testar responsividade (mobile, tablet, desktop)

---

## 🔧 Troubleshooting

**Erro 500:**
- Verifique `APP_KEY` está configurado
- Verifique database está conectado
- Rode migrations: `php artisan migrate --force`

**CSS não carrega:**
- Verifique `APP_URL` está correto
- Rode: `php artisan storage:link`
- Rode: `npm run build`

**Database não conecta:**
- Verifique variáveis DB_* estão corretas
- Railway/Render preenchem automaticamente via DATABASE_URL
- Verifique PostgreSQL está rodando

---

## 🌐 URLs Importantes

- **Aplicação:** https://seu-app.railway.app
- **Admin:** https://seu-app.railway.app/admin
- **Biblioteca:** https://seu-app.railway.app/library

---

## 💰 Custos

- **Railway:** $5/mês de crédito gratuito (suficiente para começar)
- **Render:** Tier gratuito disponível (com limitações)
- **Heroku:** $5/mês para hobby tier
