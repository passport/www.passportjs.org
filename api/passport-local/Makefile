MODULES = 1.x

DESTDIR ?= $(CURDIR)/var/www

all:
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

.PHONY: all
