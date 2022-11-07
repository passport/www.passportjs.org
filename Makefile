www: html assets

html:
	node site

assets:
	make -C web


.PHONY: html assets
