html: src
	echo "Make passport-local 1.x"
	JSDOCFLAGS="-t ../../../../node_modules/@passportjs.org/jsdoc-template" make -C src html

src:
	git clone https://github.com/jaredhanson/passport-local.git src
	cd src && npm install

.PHONY: html
