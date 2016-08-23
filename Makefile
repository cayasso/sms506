BABEL = ./node_modules/.bin/babel
MOCHA = ./node_modules/.bin/mocha

all: lib

lib: src
	@echo Building... >&2; \
	$(BABEL) src -d lib

clean:
	@echo Cleaning... >&2; \
	rm -rf lib/

build:
	@status=$$(git status ./src --porcelain); \
		if test "x$${status}" != x; then \
			make lib >&2; \
			git add ./lib >&2; \
		fi

test:
	@make clean && make lib; \
	$(MOCHA) \
		--reporter spec \
		--require should \
		--require babel-polyfill \
		--require babel-core/register \
		--recursive \
		test

.PHONY: test clean lib
