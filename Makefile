all: pages assets

pages:
	node site

assets:
	make -C web

www:
	git worktree add -B gh-pages www origin/gh-pages


.PHONY: pages assets
