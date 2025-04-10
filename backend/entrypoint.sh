#!/bin/sh

echo "⏳ Aguardando o banco de dados ficar disponível..."
while ! nc -z "$DATABASE_HOST" "$DATABASE_PORT"; do
  sleep 1
done

echo "✅ Banco disponível! Rodando migrations..."
npx sequelize db:migrate

echo "🚀 Inicializando aplicação..."
npm start

