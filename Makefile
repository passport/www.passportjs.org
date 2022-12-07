www: html assets

html:
	node site

assets:
	make -C web

api:
	make -C api
	DESTDIR=$(CURDIR)/www/api make -C api install


.PHONY: html assets api
