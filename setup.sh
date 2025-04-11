#!/bin/bash

echo "🔧 Iniciando setup do projeto Gerenciador de Despesas..."

# Função para criar ou garantir o conteúdo padrão do .env
setup_env_file() {
  local env_path=$1

  if [ -f "$env_path" ]; then
    echo "📁 Verificando $env_path..."
    sed -i 's/^POSTGRES_USER=.*/POSTGRES_USER=root/' "$env_path"
    sed -i 's/^POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=root/' "$env_path"
    sed -i 's/^POSTGRES_HOST=.*/POSTGRES_HOST=database/' "$env_path"
    sed -i 's/^POSTGRES_PORT=.*/POSTGRES_PORT=5432/' "$env_path"
    sed -i 's/^POSTGRES_DB=.*/POSTGRES_DB=despesas_db/' "$env_path"
    echo "🔁 Atualizado $env_path com os valores padrão."
  else
    echo "📄 Criando $env_path com os valores padrão..."
    cat <<EOF > "$env_path"
# Para o PostgreSQL
POSTGRES_DB=despesas_db
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_HOST=database
POSTGRES_PORT=5432

# Alias para o backend
DATABASE_NAME=\${POSTGRES_DB}
DATABASE_USER=\${POSTGRES_USER}
DATABASE_PASSWORD=\${POSTGRES_PASSWORD}
DATABASE_HOST=\${POSTGRES_HOST}
DATABASE_PORT=\${POSTGRES_PORT}
EOF
  fi
}

# Setup do .env raiz
setup_env_file "./.env"

# Setup do frontend/.env
if [ ! -f "./frontend/.env" ]; then
  echo "📄 Copiando ./frontend/.env.example para ./frontend/.env"
  cp ./frontend/.env.example ./frontend/.env
fi

echo ""
echo "✅ Setup finalizado! Agora você pode rodar:"
echo ""
echo "   docker compose down -v"
echo "   docker compose up -d --build"

