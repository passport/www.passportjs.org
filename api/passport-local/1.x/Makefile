html: src
	echo "Make passport-local 1.x"
	JSDOCFLAGS="-t ../../../../node_modules/@passportjs.org/jsdoc-template" make -C src html
	mkdir -p ../../../www/api/passport-local/1.x
	cp -r src/doc/* ../../../www/api/passport-local/1.x

src:
	git clone https://github.com/jaredhanson/passport-local.git src
	cd src && npm install

.PHONY: html
