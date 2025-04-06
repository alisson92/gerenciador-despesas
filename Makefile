# Caminhos dos arquivos
COMPOSE_DEV=docker-compose.yml
COMPOSE_PROD=docker-compose.prod.yml
POSTGRES_DEV=postgres-container
POSTGRES_PROD=postgres-prod
ENV_DEV=.env
ENV_PROD=.env.prod

# Comandos gerais
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

# Produção
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

# Banco de dados
backup:
	docker exec -t $(POSTGRES_DEV) pg_dump -U $$DATABASE_USER $$DATABASE_NAME > backup.sql

backup-prod:
	docker exec -t $(POSTGRES_PROD) pg_dump -U $$DATABASE_USER $$DATABASE_NAME > backup-prod.sql

restore:
	cat backup.sql | docker exec -i $(POSTGRES_DEV) psql -U $$DATABASE_USER $$DATABASE_NAME

restore-prod:
	cat backup-prod.sql | docker exec -i $(POSTGRES_PROD) psql -U $$DATABASE_USER $$DATABASE_NAME

# Limpeza
prune:
	docker system prune -f

# Ajuda
help:
	@./scripts/makefile-shortcuts.sh
