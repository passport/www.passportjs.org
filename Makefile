www: html assets

html:
	node site

assets:
	make -C web

api:
	JSDOCFLAGS="-c $(CURDIR)/etc/conf.json -t $(CURDIR)/node_modules/@passportjs.org/jsdoc-template" make -C api
	DESTDIR=$(CURDIR)/www/api make -C api install


.PHONY: html assets api
