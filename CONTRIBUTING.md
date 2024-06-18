# Contributing to `www.kerouacjs.org`

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

Stylesheets are authored in [Stylus](https://stylus-lang.com/) and compiled to
CSS during the build step.  Source files are located in the [web/styles](https://github.com/passport/www.passportjs.org/tree/master/web/styles)
directory.


