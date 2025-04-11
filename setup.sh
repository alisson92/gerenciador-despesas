#!/bin/bash

echo "🔧 Iniciando setup do projeto Gerenciador de Despesas..."

# Função para copiar .env se não existir
copiar_env() {
  local pasta=$1
  echo "📁 Verificando $pasta/.env..."
  
  if [ -f "$pasta/.env" ]; then
    echo "✅ $pasta/.env já existe. Pulando..."
  elif [ -f "$pasta/.env.example" ]; then
    echo "📄 Copiando $pasta/.env.example para $pasta/.env"
    cp "$pasta/.env.example" "$pasta/.env"
  else
    echo "⚠️ Arquivo $pasta/.env.example não encontrado. Verifique o repositório."
  fi
}

# Copiar .env da raiz
copiar_env .

# Copiar .env do frontend
copiar_env ./frontend

echo ""
echo "✅ Setup finalizado! Agora você pode rodar:"
echo ""
echo "   docker-compose up -d --build"
echo ""

