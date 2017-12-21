site:
	node site

app:
	make -C web
	
	
BIN ?= ./node_modules/.bin

STYLUS ?= $(BIN)/stylus
	
css:
	$(STYLUS) public/stylesheets/app.styl


.PHONY: site app
