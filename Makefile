site:
	node site

publish:
	scp -rp passportjs.org jaredhanson@passportjs.org:/home/jaredhanson

.PHONY: site publish
