BIN ?= ./node_modules/.bin

RJS ?= $(BIN)/r.js
STYLUS ?= $(BIN)/stylus


all: css js

css: node_modules
	$(STYLUS) styles/app.styl -o ../www/assets/styles/all.css

js: node_modules
	$(RJS) -o build.js

node_modules:
	npm install


.PHONY: css js
