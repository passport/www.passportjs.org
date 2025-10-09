# Contributing to `www.passportjs.org`

## Getting Started

To build this site, you'll need a working development environment with [Node.js](https://nodejs.org/)
and [Git](https://git-scm.com/).  Once these tools are set up, you can build
this site by executing the following commands:

```sh
$ git clone https://github.com/passport/www.passportjs.org.git
$ cd www.passportjs.org
$ make
```

A typical development workflow is as follows:

```sh
# ... hack hack hack ...
$ make
$ git status                # review changes to source code
$ git diff                  # review changes to source code
$ git add --all
$ git commit                # commit changes to source code
$ git push origin master
$ cd www                    # change to working tree of generated site
$ git status                # review changes to generated site
$ git diff                  # review changes to generated site
$ git add --all
$ git commit                # commit changes to generated site
$ git push origin gh-pages  # deploy site
```

## Development

### Architecture

The architecture of this site is simple: it is a static site consisting of HTML,
CSS, and JavaScript.  Toolchain choices tend to favor staying as close to web
standards and Node.js conventions as possible, minimizing the need for
frameworks and dependencies.

#### CSS

CSS is structured using the techniques described in [Scalable and Modular
Architecture for CSS](http://smacss.com/) (SMACSS).

Stylesheets are authored in [Stylus](https://stylus-lang.com/).  Source files
are located in the [`web/styles`](https://github.com/passport/www.passportjs.org/tree/master/web/styles)
directory.  Rules are split across multiple files named in accordance with
SMACCS [categorization](http://smacss.com/book/categorizing/).  `app.style`
is the "main" stylesheet which imports all others.  The source files are
compiled to a single CSS stylesheet during the build step.

### Style Guide

