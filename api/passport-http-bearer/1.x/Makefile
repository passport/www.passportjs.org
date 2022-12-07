DESTDIR ?= ./var/www

all:
	jsdoc $(JSDOCFLAGS) -P src/package.json -r src

install:
	mkdir -p $(DESTDIR)
	cp -r out/* $(DESTDIR)

clean:
	rm -rf out

.PHONY: all install clean
