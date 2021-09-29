install:
	npm ci

lint:
	npx eslint .

tests:
	npm run test

test-coverage:
	npm test -- --coverage --coverageProvider=v8