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

test_compose = docker-compose -f ./docker-compose.test.yml --env-file ./.env.test

.PRONY: test
test: 
	make test-build && $(test_compose) run pagaleve_test && make test-down
.PRONY: test-build
test-build: 
	$(test_compose) build
.PRONY: test-down
test-down: 
	$(test_compose) down -v