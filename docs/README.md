
# Overview

Passport is authentication middleware for [Node](http://nodejs.org/).  It is
designed to serve a singular purpose: authenticate requests.  When writing
modules, encapsulation is a virtue, so Passport delegates all other
functionality to the application.  This separation of concerns keeps code clean
and maintainable, and makes Passport extremely easy to integrate into an
application.

In modern web applications, authentication can take a variety of forms.
Traditionally, users log in by providing a username and password.  With the rise
of social networking, single sign-on using an [OAuth](http://oauth.net/)
provider such as [Facebook](https://www.facebook.com/) or [Twitter](https://twitter.com/)
has become a popular authentication method.  Services that expose an API often
require token-based credentials to protect access.

Passport recognizes that each application has unique authentication
requirements.  Authentication mechanisms, known as _strategies_, are packaged as
individual modules.  Applications can choose which strategies to employ, without
creating unnecessary dependencies.

Despite the complexities involved in authentication, code does not have to be
complicated.

```javascript
app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));
```

## Install

```bash
$ npm install passport
```
