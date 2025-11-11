# 📚 BookVault - Biblioteca Digital Premium

Uma plataforma moderna de biblioteca digital construída com Laravel 12, Livewire 3 e Filament Admin, inspirada no Google Books.

![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?logo=laravel)
![Livewire](https://img.shields.io/badge/Livewire-3-4E56A6?logo=livewire)
![Filament](https://img.shields.io/badge/Filament-3-FDAE33)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)

## ✨ Features

### Para Leitores
- 📖 **Interface de Leitura Premium** - Design minimalista inspirado no Google Books
- 🎨 **Modo Escuro** - Leitura confortável em qualquer ambiente
- 🔍 **Busca Avançada** - Encontre livros por título, autor ou descrição
- 📊 **Progresso de Leitura** - Acompanhe seu progresso em tempo real
- 🎯 **Navegação Intuitiva** - Índice interativo e navegação entre capítulos
- 📱 **Totalmente Responsivo** - Funciona perfeitamente em mobile, tablet e desktop
- 🔤 **Tamanho de Fonte Ajustável** - Personalize sua experiência de leitura
- 🔐 **Sistema de Acesso Único** - Cada usuário acessa apenas seus livros autorizados

### Para Administradores
- ⚡ **Painel Filament Admin** - Interface administrativa profissional
- 📚 **Gerenciamento de Livros** - CRUD completo com upload de capas
- 📝 **Gerenciamento de Capítulos** - Organização e edição de conteúdo
- 👥 **Controle de Usuários** - Gerenciamento de acessos e permissões
- 🔑 **Sistema de Acessos** - Conceda/revogue acesso a livros por usuário
- ⏰ **Acessos Temporários** - Defina data de expiração para acessos

## 🚀 Stack Tecnológica

- **Backend:** Laravel 12 (PHP 8.4)
- **Frontend:** Livewire 3 + Alpine.js
- **UI:** Tailwind CSS
- **Admin Panel:** Filament 3
- **Database:** PostgreSQL
- **Auth:** Laravel Breeze

## 📋 Requisitos

- PHP 8.4+
- PostgreSQL 13+
- Composer 2.8+
- Node.js 18+ & NPM

## 🛠️ Instalação

### 1. Clone o repositório
```bash
git clone <repository-url>
cd book
```

### 2. Instale as dependências
```bash
composer install
npm install
```

### 3. Configure o ambiente
```bash
cp .env.example .env
php artisan key:generate
```

### 4. Configure o banco de dados no `.env`
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=bookvault
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
```

### 5. Crie o banco de dados
```bash
createdb bookvault
# ou
psql -U postgres -c "CREATE DATABASE bookvault;"
```

### 6. Execute as migrations
```bash
php artisan migrate
```

### 7. Compile os assets
```bash
npm run build
# ou para desenvolvimento
npm run dev
```

### 8. Inicie o servidor
```bash
php artisan serve
```

Acesse: `http://localhost:8000`

## 👤 Criar Usuário Admin

```bash
php artisan make:filament-user
```

Siga as instruções no terminal para criar o primeiro usuário administrador.

## 📖 Como Usar

### Painel Admin (Filament)

Acesse: `http://localhost:8000/admin`

**Gerenciar Livros:**
1. Vá em "Books" no menu lateral
2. Clique em "Create" para adicionar um novo livro
3. Preencha: Título, Autor, Descrição, Slug, URL da Capa
4. Marque "Is Published" para tornar o livro visível

**Gerenciar Capítulos:**
1. Vá em "Chapters" no menu lateral
2. Crie capítulos vinculados a um livro
3. Defina a ordem (1, 2, 3...) para sequência de leitura
4. Cole o conteúdo do capítulo

**Gerenciar Acessos:**
1. Vá em "Book Accesses"
2. Selecione o usuário e o livro
3. Opcionalmente, defina uma data de expiração
4. Salve para conceder acesso

### Interface de Leitura

**Biblioteca (`/library`):**
- Visualize todos os livros que você tem acesso
- Use a busca para filtrar livros
- Clique em um livro para começar a ler

**Leitor (`/read/{slug}`):**
- Navegue entre capítulos com as setas
- Abra o índice para pular para qualquer capítulo
- Ajuste o tamanho da fonte com os botões + e -
- Clique na área de leitura para mostrar/ocultar controles
- Acompanhe seu progresso na barra superior

## 🗂️ Estrutura do Projeto

```
bookvault/
├── app/
│   ├── Filament/
│   │   └── Resources/          # Resources do Filament Admin
│   │       ├── BookResource.php
│   │       ├── ChapterResource.php
│   │       └── BookAccessResource.php
│   ├── Livewire/
│   │   ├── Library/
│   │   │   └── BookGrid.php    # Componente da Biblioteca
│   │   └── Reader/
│   │       └── BookReader.php  # Componente do Leitor
│   └── Models/
│       ├── Book.php            # Model de Livro
│       ├── Chapter.php         # Model de Capítulo
│       ├── BookAccess.php      # Model de Acesso
│       └── User.php
├── resources/
│   └── views/
│       ├── layouts/
│       │   ├── app.blade.php   # Layout principal
│       │   └── reader.blade.php # Layout do leitor
│       └── livewire/
│           ├── library/
│           │   └── book-grid.blade.php
│           └── reader/
│               └── book-reader.blade.php
└── database/
    └── migrations/
        ├── *_create_books_table.php
        ├── *_create_chapters_table.php
        └── *_create_book_accesses_table.php
```

## 🎨 Design

O design foi inspirado no **Google Books** com foco em:
- ✅ Tipografia premium (Literata para leitura, Inter para UI)
- ✅ Espaçamento generoso para conforto visual
- ✅ Animações suaves e transições elegantes
- ✅ Modo escuro nativo
- ✅ Interface limpa e minimalista

## 🔐 Segurança

- ✅ Autenticação obrigatória (Laravel Breeze)
- ✅ Verificação de acesso por livro
- ✅ Proteção CSRF
- ✅ Prepared statements (Eloquent ORM)
- ✅ Validação de inputs
- ✅ Sanitização de outputs

## 📱 Responsividade

- 📱 **Mobile:** Layout single-column, navegação touch-friendly
- 📱 **Tablet:** Grid otimizado, controles adaptados
- 💻 **Desktop:** Grid 6 colunas, leitura confortável

## 🚀 Deploy

### Vercel/Netlify (Frontend)
```bash
npm run build
```

### Heroku/DigitalOcean (Full Stack)
1. Configure as variáveis de ambiente
2. Execute migrations: `php artisan migrate --force`
3. Compile assets: `npm run build`

## 📝 Próximos Passos

Para começar a usar o BookVault:

1. ✅ Crie um usuário admin: `php artisan make:filament-user`
2. ✅ Acesse o admin: `http://localhost:8000/admin`
3. ✅ Cadastre seu primeiro livro
4. ✅ Adicione capítulos ao livro
5. ✅ Crie um usuário leitor (via registro ou admin)
6. ✅ Conceda acesso ao livro para o usuário
7. ✅ Faça login como leitor e comece a ler!

---

**Desenvolvido com ❤️ usando Laravel, Livewire e Filament**
