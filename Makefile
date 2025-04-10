# 📦 Makefile - Gerenciador de Despesas
# Automatiza tarefas de desenvolvimento, produção e banco de dados usando Docker Compose

# Arquivos de configuração
COMPOSE_DEV=docker-compose.yml
COMPOSE_PROD=docker-compose.prod.yml
POSTGRES_DEV=postgres
POSTGRES_PROD=postgres-prod
ENV_DEV=.env
ENV_PROD=.env.prod
BACKUP_FILE=backup.sql

# Targets declarados como auxiliares
.PHONY: all up down logs ps restart up-prod down-prod logs-prod ps-prod restart-prod backup backup-prod restore restore-prod prune help check-deps

# 🔰 Alvo padrão
all: help

# ============================
# 🔧 Desenvolvimento (DEV)
# ============================

up:
	docker-compose -f $(COMPOSE_DEV) --env-file $(ENV_DEV) up -d --build

down:
	docker-compose -f $(COMPOSE_DEV) --env-file $(ENV_DEV) down

logs:
	docker-compose -f $(COMPOSE_DEV) logs -f

ps:
	docker-compose -f $(COMPOSE_DEV) ps

restart:
	@echo "🧹 Finalizando containers antigos (dev)..."
	docker-compose -f $(COMPOSE_DEV) --env-file $(ENV_DEV) down
	@echo "🚀 Subindo novo build (dev)..."
	docker-compose -f $(COMPOSE_DEV) --env-file $(ENV_DEV) up -d --build
	@echo "✅ Ambiente de desenvolvimento reiniciado!"

# ============================
# 🚀 Produção (PROD)
# ============================

up-prod:
	docker-compose -f $(COMPOSE_PROD) --env-file $(ENV_PROD) up -d --build

down-prod:
	docker-compose -f $(COMPOSE_PROD) --env-file $(ENV_PROD) down

logs-prod:
	docker-compose -f $(COMPOSE_PROD) logs -f

ps-prod:
	docker-compose -f $(COMPOSE_PROD) ps

restart-prod:
	@echo "🧹 Finalizando containers antigos (prod)..."
	docker-compose -f $(COMPOSE_PROD) --env-file $(ENV_PROD) down
	@echo "🚀 Subindo novo build (prod)..."
	docker-compose -f $(COMPOSE_PROD) --env-file $(ENV_PROD) up -d --build
	@echo "✅ Ambiente de produção reiniciado!"

# ============================
# 🐘 Banco de Dados
# ============================

backup:
	@bash -c 'set -o allexport && source $(ENV_DEV) && bash scripts/backup.sh $(POSTGRES_DEV) "$$DATABASE_USER" "$$DATABASE_NAME"'

backup-prod:
	@bash -c 'set -o allexport && source $(ENV_PROD) && bash scripts/backup.sh $(POSTGRES_PROD) "$$DATABASE_USER" "$$DATABASE_NAME"'

restore:
	@bash -c 'set -o allexport && source $(ENV_DEV) && cat $(BACKUP_FILE) | docker exec -i $(POSTGRES_DEV) psql -U "$$DATABASE_USER" "$$DATABASE_NAME"'

restore-prod:
	@bash -c 'set -o allexport && source $(ENV_PROD) && cat $(BACKUP_FILE) | docker exec -i $(POSTGRES_PROD) psql -U "$$DATABASE_USER" "$$DATABASE_NAME"'

# ============================
# 🧹 Utilitários
# ============================

prune:
	docker system prune -f

check-deps:
	@command -v docker >/dev/null 2>&1 || { echo "❌ Docker não está instalado."; exit 1; }
	@command -v docker-compose >/dev/null 2>&1 || { echo "❌ Docker Compose não está instalado."; exit 1; }
	@echo "✅ Todas as dependências estão instaladas."

# ============================
# 📘 Ajuda
# ============================

help:
	@./scripts/makefile-shortcuts.sh
