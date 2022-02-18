dev_compose = docker-compose -f ./docker-compose.dev.yml --env-file ./.env

.PRONY: dev
dev: 
	$(dev_compose) up --build
.PRONY: dev-detached
dev-detached: 
	$(dev_compose) up --build -d
.PRONY: dev-down
dev-down: 
	$(dev_compose) down -v