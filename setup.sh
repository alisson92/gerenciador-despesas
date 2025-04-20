#!/bin/bash

echo "🔧 Iniciando setup do projeto Gerenciador de Despesas..."

# Criação ou cópia do .env principal
if [ -f "./.env" ]; then
  echo "📁 O arquivo .env já existe. Atualizando ele com o modelo do .env.example."
  cp .env.example .env
else
  echo "📄 Criando .env a partir de .env.example..."
  cp .env.example .env
fi

# Criação ou cópia do frontend/.env
if [ -f "./frontend/.env" ]; then
  echo "📁 O arquivo ./frontend/.env já existe. Mantendo-o."
else
  echo "📄 Copiando ./frontend/.env.example para ./frontend/.env"
  cp ./frontend/.env.example ./frontend/.env
fi

echo ""
echo "✅ Setup finalizado! Agora você pode rodar:"
echo ""
echo "   docker compose down -v"
echo "   docker compose up -d --build"
