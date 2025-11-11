# 📦 Instalação do BookVault

## ⚠️ IMPORTANTE: Clone o Branch Correto!

O projeto está no branch **claude/code-study-analysis-011CV1AAxpXudZmgeBYzTh3K**

## 🚀 Instalação Passo a Passo

### 1. Clone o Repositório

```bash
# OPÇÃO A: Clone direto no branch correto
git clone -b claude/code-study-analysis-011CV1AAxpXudZmgeBYzTh3K https://github.com/aintegrare/book.git
cd book

# OPÇÃO B: Ou clone e mude para o branch
git clone https://github.com/aintegrare/book.git
cd book
git checkout claude/code-study-analysis-011CV1AAxpXudZmgeBYzTh3K
git pull origin claude/code-study-analysis-011CV1AAxpXudZmgeBYzTh3K
```

### 2. Verifique os Arquivos Essenciais

```bash
# Estes arquivos DEVEM existir:
ls -la | grep -E "(composer.json|package.json|.env.example)"
```

Você deve ver:
- `composer.json` ✓
- `package.json` ✓
- `.env.example` ✓

### 3. Instale as Dependências PHP

```bash
composer install
```

### 4. Instale as Dependências Node

```bash
npm install
```

### 5. Configure o Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Gere a chave da aplicação
php artisan key:generate
```

### 6. Configure o Banco de Dados

Edite o arquivo `.env`:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=bookvault
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

### 7. Crie o Banco de Dados

```bash
# PostgreSQL
createdb bookvault

# Ou via psql
psql -U postgres -c "CREATE DATABASE bookvault;"
```

### 8. Execute as Migrations

```bash
php artisan migrate
```

### 9. Compile os Assets

```bash
# Desenvolvimento (watch mode)
npm run dev

# Ou produção
npm run build
```

### 10. Inicie o Servidor

```bash
php artisan serve
```

Acesse: http://localhost:8000

### 11. Crie um Usuário Admin

```bash
php artisan make:filament-user
```

Acesse o painel admin: http://localhost:8000/admin

---

## 🐛 Troubleshooting

### "composer.json not found"
❌ Você está no branch errado!
✅ Solução:
```bash
git checkout claude/code-study-analysis-011CV1AAxpXudZmgeBYzTh3K
git pull origin claude/code-study-analysis-011CV1AAxpXudZmgeBYzTh3K
```

### "package.json not found"
❌ Mesmo problema - branch errado!
✅ Use o comando acima

### ".env.example not found"
❌ Branch errado ou repositório corrompido
✅ Clone novamente com o comando da Opção A

### "Connection refused" (PostgreSQL)
❌ PostgreSQL não está rodando
✅ Solução:
```bash
# macOS (Homebrew)
brew services start postgresql

# Linux
sudo service postgresql start

# Windows
# Inicie o serviço PostgreSQL pelo Services
```

### Erro de permissão no storage/logs
```bash
chmod -R 775 storage bootstrap/cache
```

---

## 📋 Requisitos do Sistema

- **PHP:** 8.4 ou superior
- **PostgreSQL:** 13 ou superior
- **Composer:** 2.8 ou superior
- **Node.js:** 18 ou superior
- **NPM:** 9 ou superior

---

## ✅ Verificação Final

Após instalação, você deve ter:

1. ✓ Servidor rodando em http://localhost:8000
2. ✓ Admin acessível em http://localhost:8000/admin
3. ✓ Biblioteca em http://localhost:8000/library
4. ✓ Material Design 3 carregando corretamente
5. ✓ Sem erros no console do navegador

---

## 💡 Comandos Úteis

```bash
# Limpar cache
php artisan cache:clear
php artisan config:clear
php artisan view:clear

# Recompilar assets
npm run build

# Ver logs
tail -f storage/logs/laravel.log

# Rodar migrations do zero
php artisan migrate:fresh

# Seeder (se disponível)
php artisan db:seed
```

---

## 🆘 Precisa de Ajuda?

Se continuar tendo problemas, verifique:
1. Você está no branch correto? `git branch`
2. Todos os arquivos existem? `ls -la`
3. PostgreSQL está rodando? `psql -U postgres -c "SELECT version();"`
4. PHP versão correta? `php -v`
5. Composer instalado? `composer --version`
