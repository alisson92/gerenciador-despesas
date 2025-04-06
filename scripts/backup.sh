#!/bin/bash

# Configurações
CONTAINER_NAME=$1
DB_USER=$2
DB_NAME=$3
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="$BACKUP_DIR/backup_${DB_NAME}_${TIMESTAMP}.sql.gz"

# Verifica se o diretório de backup existe, senão cria
mkdir -p "$BACKUP_DIR"

# Executa o backup
echo "⏳ Iniciando backup do banco '$DB_NAME' no container '$CONTAINER_NAME'..."

docker exec -t "$CONTAINER_NAME" pg_dump -U "$DB_USER" "$DB_NAME" | gzip > "${BACKUP_FILE}.gz"

if [ $? -eq 0 ]; then
    echo "✅ Backup concluído com sucesso: $BACKUP_FILE"
else
    echo "❌ Erro ao realizar o backup!"
    exit 1
fi

