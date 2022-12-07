MODULES = \
passport-http-bearer \
passport-local

DESTDIR ?= $(CURDIR)/var/www

all:
	echo $(MODULES)
	@for dir in $(MODULES); do \
		$(MAKE) -C $$dir; \
	done

install:
	@for dir in $(MODULES); do \
		DESTDIR=$(DESTDIR)/$$dir $(MAKE) -C $$dir install; \
	done

clean:
	@for dir in $(MODULES); do \
		$(MAKE) -C $$dir clean; \
	done

.PHONY: all install lean
