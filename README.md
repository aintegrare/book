# 📚 BiblioTech - Biblioteca Digital

Uma biblioteca digital moderna construída com React + Vite, inspirada no Google Books, onde os livros são armazenados e lidos diretamente na aplicação.

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

## ✨ Funcionalidades

### 📖 Leitor de Livros Integrado
- Leitura fluida diretamente no navegador
- Navegação entre capítulos
- Controle de tamanho de fonte
- Interface limpa e focada na leitura

### 🔐 Sistema de Acesso por Código
- Desbloqueio de livros via código único
- Sem necessidade de autenticação complexa
- Sistema simples e eficiente

### 🔍 Catálogo e Busca
- Busca por título, autor ou descrição
- Filtros por gênero e idioma
- Cards informativos com preview
- Grid responsivo

### 🌙 Modo Escuro/Claro
- Toggle fácil entre temas
- Preferência salva no navegador
- Design adaptado para ambos os modos

### 📌 Marcadores e Anotações
- Adicione marcadores em qualquer capítulo
- Crie anotações com notas personalizadas
- Destaque trechos com cores diferentes
- Tudo salvo no LocalStorage

### 📊 Progresso de Leitura
- Acompanhe quanto já leu de cada livro
- Retome de onde parou
- Visualização de progresso em percentual

## 🚀 Como Usar

### Desenvolvimento Local

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd book
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Abra no navegador**
   - Acesse `http://localhost:5173`

### Adicionar Novos Livros

Edite o arquivo `src/data/books.json`:

```json
{
  "id": "unique-book-id",
  "code": "ACCESS_CODE",
  "title": "Título do Livro",
  "author": "Nome do Autor",
  "year": 2024,
  "genre": "Gênero",
  "language": "Idioma",
  "cover": "URL_da_capa",
  "description": "Descrição do livro...",
  "pages": 300,
  "chapters": [
    {
      "number": 1,
      "title": "Título do Capítulo",
      "content": "Conteúdo do capítulo..."
    }
  ]
}
```

## 🎨 Tecnologias Utilizadas

- **Frontend:** React 19
- **Build Tool:** Vite 7
- **Estilização:** TailwindCSS 4
- **Roteamento:** React Router 6
- **Ícones:** Lucide React
- **Deploy:** Netlify

## 📦 Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Preview do build de produção
npm run lint     # Executa o linter
```

## 🌐 Deploy no Netlify

### Método 1: Netlify CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Método 2: Interface Web

1. Faça push do código para GitHub/GitLab
2. Conecte o repositório no [Netlify](https://netlify.com)
3. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy automático!

## 🎯 Códigos de Acesso de Exemplo

Para testar a aplicação, use estes códigos:

| Livro | Código |
|-------|--------|
| Dom Casmurro | `DC2025` |
| Alice's Adventures in Wonderland | `ALICE123` |
| A Metamorfose | `KAFKA99` |

## 📁 Estrutura do Projeto

```
book/
├── src/
│   ├── components/      # Componentes reutilizáveis
│   │   ├── Navbar.jsx
│   │   └── BookCard.jsx
│   ├── contexts/        # Context API
│   │   ├── ThemeContext.jsx
│   │   └── BookContext.jsx
│   ├── data/            # Dados estáticos
│   │   └── books.json
│   ├── pages/           # Páginas principais
│   │   ├── Home.jsx
│   │   ├── Access.jsx
│   │   └── BookReader.jsx
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Entry point
│   └── index.css        # Estilos globais
├── public/              # Arquivos públicos
├── index.html           # HTML principal
├── netlify.toml         # Configuração Netlify
├── tailwind.config.js   # Configuração Tailwind
├── vite.config.js       # Configuração Vite
└── package.json         # Dependências
```

## 🔮 Futuras Melhorias

- [ ] Integração com backend Laravel
- [ ] Sistema de usuários completo
- [ ] Upload de arquivos EPUB
- [ ] Busca em texto completo
- [ ] Compartilhamento de anotações
- [ ] PWA (Progressive Web App)
- [ ] Sincronização na nuvem
- [ ] Suporte a mais formatos (PDF, MOBI)

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório!

---

Feito com ❤️ usando React + Vite
