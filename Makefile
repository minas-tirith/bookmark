deps:
	yarn install
	curl -o shmig https://raw.githubusercontent.com/mbucc/shmig/master/shmig
	chmod +x shmig
init:
	@ export $$(cat .env | grep -v ^\# | xargs) >> /dev/null \
	&& ./shmig -t mysql -l $$DB_USER -p $$DB_PASS -P $$DB_PORT -d $$DB_DATABASE -H $$DB_HOST -m migrations -s migrations up \
	&& echo "migrations: ok"
test:
	./node_modules/.bin/jest --runInBand --globalSetup ./tests/index.js --forceExit
lint:
	./node_modules/.bin/eslint src
run: init
	node src/