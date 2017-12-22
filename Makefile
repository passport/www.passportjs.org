all: pages assets

pages:
	node site

assets:
	make -C web


.PHONY: pages assets
