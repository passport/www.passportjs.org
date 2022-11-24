www: html assets

html:
	node site

assets:
	make -C web

api:
	make -C api


.PHONY: html assets api
