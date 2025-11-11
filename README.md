# 📚 BookVault - Biblioteca Digital Premium

> Uma plataforma moderna de biblioteca digital inspirada no Google Books, construída com Laravel 11 e Filament 3.

## 🎯 Visão Geral

**BookVault** é uma plataforma de biblioteca digital profissional que permite gerenciar e publicar livros online com controle granular de acesso. Perfeita para:

- Editoras digitais
- Plataformas educacionais
- Bibliotecas corporativas
- Criadores de conteúdo
- Cursos online

## ✨ Features Implementadas

### 🔐 Autenticação & Autorização
- Laravel Breeze para auth completo (login, registro, recuperação de senha)
- Sistema de roles com Spatie Permission (admin, reader)
- Controle de acesso granular por livro
- Expiração configurável de acessos

### 📖 Gerenciamento de Livros
- CRUD completo de livros
- Capítulos ordenados com suporte a rich content
- Slugs automáticos (SEO-friendly)
- Status de publicação
- Capa de livro (cover image)
- Metadata completa (autor, descrição, etc.)

### 👨‍💼 Painel Admin (Filament 3)
- Interface moderna e responsiva
- Gerenciamento de livros e capítulos
- Controle de acessos de usuários
- Dashboard com estatísticas
- Upload de imagens

### 🎨 Design Inspirado no Google Books
- Interface limpa e profissional
- Modo escuro/claro (Tailwind CSS)
- Responsivo (mobile-first)
- Tipografia otimizada para leitura

## 🛠️ Stack Tecnológica

**Backend:**
- Laravel 11 (PHP 8.4)
- PostgreSQL
- Eloquent ORM

**Frontend:**
- Blade Templates
- Tailwind CSS
- Alpine.js
- Vite

**Admin Panel:**
- Filament 3
- Livewire 3

**Packages:**
- Laravel Breeze (Auth)
- Spatie Laravel Permission (Roles)
- Filament Panel Builder

## 🚀 Instalação

### Pré-requisitos

- PHP 8.2+
- Composer
- PostgreSQL (ou MySQL/SQLite)
- Node.js & NPM

### Passos

```bash
# Clone o repositório
git clone <seu-repo>
cd book

# Instale dependências PHP
composer install

# Instale dependências Node
npm install

# Configure o .env
cp .env.example .env
php artisan key:generate

# Configure o banco de dados no .env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=bookvault
DB_USERNAME=postgres
DB_PASSWORD=

# Execute as migrations
php artisan migrate

# Crie o usuário admin e dados de exemplo
php artisan db:seed --class=AdminSeeder

# Compile assets
npm run build

# Inicie o servidor
php artisan serve
```

## 🔑 Credenciais Padrão

Após executar o seeder, você pode acessar:

**Admin Panel:** `http://localhost:8000/admin`
- Email: `admin@bookvault.com`
- Password: `password`

**Frontend:** `http://localhost:8000`

## 📁 Estrutura do Projeto

```
app/
├── Filament/
│   └── Resources/        # Admin resources
├── Models/
│   ├── Book.php         # Modelo de livro
│   ├── Chapter.php      # Modelo de capítulo
│   ├── BookAccess.php   # Modelo de acesso
│   └── User.php
└── Http/
    └── Controllers/     # Controllers do frontend

database/
├── migrations/          # Database schema
└── seeders/
    └── AdminSeeder.php  # Dados iniciais

resources/
├── views/              # Blade templates
└── css/               # Tailwind CSS

routes/
├── web.php            # Rotas públicas
└── auth.php           # Rotas de auth
```

## 🎨 Modelos de Dados

### Book
```php
- id
- title (string)
- author (string)
- description (text, nullable)
- cover_url (string, nullable)
- slug (string, unique)
- is_published (boolean)
- timestamps
```

### Chapter
```php
- id
- book_id (foreign key)
- title (string)
- content (longtext)
- order (integer)
- slug (string)
- timestamps
```

### BookAccess
```php
- id
- user_id (foreign key)
- book_id (foreign key)
- granted_at (timestamp)
- expires_at (timestamp, nullable)
- timestamps
```

## 🔧 Comandos Úteis

```bash
# Criar novo livro via Tinker
php artisan tinker
>>> App\Models\Book::create([
    'title' => 'Meu Livro',
    'author' => 'Autor',
    'description' => 'Descrição',
    'is_published' => true
]);

# Limpar cache
php artisan optimize:clear

# Recriar database
php artisan migrate:fresh --seed

# Compilar assets para produção
npm run build
```

## 🌟 Próximas Features

- [ ] **Leitor Estilo Google Books**
  - Navegação fluida entre capítulos
  - Barra de progresso
  - Busca full-text
  - Highlights e anotações

- [ ] **Importador de Conteúdo**
  - Suporte a DOCX
  - Suporte a EPUB
  - Suporte a Markdown
  - Conversão automática

- [ ] **Biblioteca Pública**
  - Grid de livros com capas
  - Filtros e busca
  - Categorias e tags
  - Recomendações

- [ ] **Analytics**
  - Tempo de leitura
  - Capítulos mais lidos
  - Usuários ativos
  - Dashboard de métricas

- [ ] **PWA**
  - Leitura offline
  - Instalável
  - Push notifications

## 📝 Licença

Este projeto é open-source sob a licença MIT.

## 👨‍💻 Desenvolvido com

Laravel 11 • Filament 3 • Tailwind CSS • PostgreSQL

---

**Made with ❤️ by Claude & Team**
