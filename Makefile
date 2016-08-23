BABEL = ./node_modules/.bin/babel

all: lib

lib: src
	$(BABEL) src -d lib

clean:
	rm -rf lib/

build:
	@status=$$(git status ./src --porcelain); \
		if test "x$${status}" != x; then \
			echo Building... >&2; \
			make lib >&2; \
			git add ./lib >&2; \
		fi

test:
	@./node_modules/.bin/mocha \
		--reporter spec \
		--require should \
		--require babel-core/register \
		--recursive \
		test

.PHONY: test clean lib
