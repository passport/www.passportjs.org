BIN ?= ./node_modules/.bin

RJS ?= $(BIN)/r.js


all: js

js: node_modules
	$(RJS) -o build.js

node_modules:
	npm install
