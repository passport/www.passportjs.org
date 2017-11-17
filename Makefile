BIN ?= ./node_modules/.bin

RJS ?= $(BIN)/r.js


js:
	$(RJS) -o build.js

site:
	node site
