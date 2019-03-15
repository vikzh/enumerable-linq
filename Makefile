install:
	npm install
publish:
	npm publish --access=public
lint:
	npx eslint .
lint-fix:
	npx eslint . --fix
build:
	npm run-script build
test:
	npm run-script test
