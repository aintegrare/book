#!/bin/bash

# Deploy Manual Script
echo "🚀 Iniciando deploy no Netlify..."

export NETLIFY_AUTH_TOKEN="nfp_UU6ZAMxBapzjbsehZir7MJY3nWoQyfkU9725"

cd /home/user/book

# Build do projeto
echo "📦 Criando build..."
npm run build

# Deploy
echo "🌐 Fazendo deploy..."
netlify deploy --prod --dir=dist --message="BiblioTech - Biblioteca Digital Completa" --open=false

echo "✅ Deploy concluído!"
