DESTDIR ?= ./var/www

all:
	jsdoc -t ../../../node_modules/@passportjs.org/jsdoc-template -P src/package.json -r src

install:
	mkdir -p $(DESTDIR)
	cp -r out/* $(DESTDIR)

clean:
	rm -rf out

.PHONY: all
