# 🏢 Sistema de Bibliotecas Corporativas

## 📚 Visão Geral

O **Bibliotecnologia** agora é uma plataforma **white-label multi-tenant** que permite que empresas criem suas próprias bibliotecas digitais personalizadas com a identidade visual de sua marca.

---

## ✨ Funcionalidades

### Para Empresas

- **Marca Personalizada**: Logo, cores e nome customizados
- **Página Dedicada**: URL exclusiva `/empresa/seu-nome`
- **Controle de Acesso**: Códigos únicos por livro
- **Design Minimalista**: Interface clean e profissional
- **Multi-dispositivo**: Responsivo e adaptável

### Para Usuários Finais

- **Acesso Simples**: Um código para desbloquear cada livro
- **Experiência Unificada**: Design consistente com a marca da empresa
- **Leitura Integrada**: Leitor de livros direto no navegador
- **Progresso Salvo**: Retome de onde parou

---

## 🎨 Customização de Marca

Cada empresa pode personalizar:

### 1. **Identidade Visual**
```json
{
  "name": "Sua Empresa",
  "brandName": "Biblioteca Sua Empresa",
  "logo": "url-do-logo.png"
}
```

### 2. **Paleta de Cores**
```json
{
  "colors": {
    "primary": {
      "500": "#FF9800",  // Cor principal
      "600": "#FB8C00",  // Hover
      "700": "#F57C00"   // Active
    },
    "accent": {
      "500": "#4CAF50",  // Destaque
      "600": "#43A047"   // Hover
    }
  }
}
```

### 3. **Informações de Contato**
```json
{
  "contact": {
    "email": "biblioteca@empresa.com",
    "phone": "+55 11 1234-5678",
    "website": "https://empresa.com"
  }
}
```

---

## 🚀 Como Adicionar uma Nova Empresa

### Passo 1: Adicionar ao `companies.json`

Edite `/src/data/companies.json`:

```json
{
  "id": "sua-empresa",
  "slug": "sua-empresa",
  "name": "Sua Empresa Ltda",
  "brandName": "Biblioteca Corporativa",
  "logo": "https://exemplo.com/logo.png",
  "description": "Acervo exclusivo para colaboradores e parceiros",
  "colors": {
    "primary": {
      "50": "#E3F2FD",
      "100": "#BBDEFB",
      "200": "#90CAF9",
      "300": "#64B5F6",
      "400": "#42A5F5",
      "500": "#2196F3",
      "600": "#1E88E5",
      "700": "#1976D2",
      "800": "#1565C0",
      "900": "#0D47A1"
    },
    "accent": {
      "50": "#F3E5F5",
      "500": "#9C27B0",
      "600": "#8E24AA"
    }
  },
  "books": ["CODIGO1", "CODIGO2"],
  "contact": {
    "email": "biblioteca@suaempresa.com",
    "website": "https://suaempresa.com"
  }
}
```

### Passo 2: Adicionar Livros

Certifique-se de que os códigos dos livros em `books` existem em `/src/data/books.json`.

### Passo 3: Testar

```bash
npm run dev
```

Acesse: `http://localhost:5173/empresa/sua-empresa`

---

## 📍 Estrutura de URLs

```
/                           → Showcase de todas as empresas
/empresa/editora-exemplo    → Biblioteca da Editora Exemplo
/empresa/tech-books         → Biblioteca da TechBooks
/empresa/sua-empresa        → Biblioteca da Sua Empresa
/catalogo                   → Catálogo geral (todos os livros)
/access                     → Acesso por código
/read/:bookId               → Leitor de livros
```

---

## 🎯 Exemplos Incluídos

### 1. **Editora Exemplo** (Laranja + Verde)
- URL: `/empresa/editora-exemplo`
- Livro: Dom Casmurro (código: `DC2025`)
- Público: Parceiros e colaboradores

### 2. **TechBooks Inc** (Azul + Roxo)
- URL: `/empresa/tech-books`
- Livro: Alice in Wonderland (código: `ALICE123`)
- Público: Desenvolvedores e engenheiros

### 3. **Clássicos Universais** (Cinza + Âmbar)
- URL: `/empresa/literatura-classica`
- Livro: A Metamorfose (código: `KAFKA99`)
- Público: Estudantes de literatura

---

## 💡 Casos de Uso

### 1. **Editoras**
Compartilhe catálogos com livrarias, distribuidores e parceiros.

### 2. **Empresas de Tecnologia**
Crie biblioteca técnica interna para desenvolvedores.

### 3. **Instituições de Ensino**
Departamentos com acervos separados e personalizados.

### 4. **Consultorias**
Compartilhe materiais exclusivos com clientes.

### 5. **ONGs e Associações**
Biblioteca para membros com marca institucional.

---

## 🎨 Paletas de Cores Pré-definidas

### Corporativo Azul
```json
"primary": "#1976D2",  "accent": "#FFC107"
```

### Tech Verde
```json
"primary": "#00796B",  "accent": "#FF5722"
```

### Editorial Vermelho
```json
"primary": "#C62828",  "accent": "#FDD835"
```

### Minimalista Cinza
```json
"primary": "#455A64",  "accent": "#26A69A"
```

Gerador de paletas Material: https://m2.material.io/design/color/

---

## 🔒 Gerenciamento de Acesso

### Como Funciona

1. **Empresa cria código** para cada livro
2. **Compartilha código** com usuários autorizados
3. **Usuário acessa** via `/access` ou link direto
4. **Código desbloqueia** livro permanentemente (LocalStorage)

### Códigos por Empresa

```javascript
// Editora Exemplo
books: ["DC2025"]

// TechBooks Inc
books: ["ALICE123"]

// Clássicos Universais
books: ["KAFKA99"]
```

---

## 📊 Métricas e Analytics (Futuro)

Próximas versões incluirão:
- Tracking de acessos por código
- Relatórios de leitura
- Tempo médio de leitura
- Livros mais populares
- Dashboard administrativo

---

## 🚀 Deploy

### Netlify

O arquivo `netlify.toml` já está configurado. Apenas faça push e conecte no Netlify.

### Domínios Personalizados (Futuro)

Possibilidade de cada empresa ter seu próprio domínio:
- `biblioteca.suaempresa.com` → Sua página
- `books.techcompany.com` → Outra empresa

---

## 📝 Próximos Passos

Para transformar em solução completa:

1. **Backend Laravel**
   - API REST para gerenciar empresas
   - Painel admin (Filament)
   - Upload de livros (EPUB)

2. **Banco de Dados**
   - PostgreSQL/MySQL
   - Tabelas: companies, books, access_codes, analytics

3. **Autenticação**
   - Login para admins das empresas
   - Gestão de códigos de acesso
   - Controle de permissões

4. **Analytics**
   - Dashboard de métricas
   - Relatórios de uso
   - Exportação de dados

---

## 💬 Suporte

Para dúvidas ou sugestões sobre o sistema multi-empresa:
1. Abra uma issue no repositório
2. Consulte a documentação em `README.md`
3. Veja exemplos em `src/data/companies.json`

---

**Bibliotecnologia** - Plataforma white-label para bibliotecas digitais corporativas.
