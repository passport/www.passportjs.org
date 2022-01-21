# Overview

Passport is authentication middleware for [Node.js](https://nodejs.org/).  It is
designed to serve a singular purpose: authenticate requests.  Passport cleanly
encapsulates this functionality, while delegating unrelated details such as data
access to the application.  Whether you are building a new application or
working on an existing one, this separation of concerns makes Passport extremely
easy to integrate.

In modern web applications, authentication can be performed in a variety of
ways.  Traditionally, users log in by providing a username and password.  Social
networks, along with the billions of people that have joined them, have made
[single sign-on](https://en.wikipedia.org/wiki/Single_sign-on) (SSO) using
[Facebook](https://www.facebook.com/) or [Google](https://www.google.com/) a
popular option.  Recent innovations, encompassed by [Web Authentication](https://en.wikipedia.org/wiki/WebAuthn)
(WebAuthn), allow people to log in using fingerprint or facial recognition.

Application architectures are also constantly evolving.  Application logic that,
in the past, had to execute on the server can now execute in the browser, with
the frontend invoking backend APIs.  Such architectures rely heavily on token-
based credentials to protect access.

Passport reduces the complexity of authenticating a request to a simple
statement:

```javascript
app.post('/login/password', passport.authenticate('local'));
```

Hidden behind that simple statement are three fundamental concepts:

  1. Middleware
  2. Strategies
  3. Sessions
  
This guide provides an overview of these concepts, explaining how they fit
together within Passport.  Some of the most commonly used authentication
mechanisms will be explored in detail, to illustrate how they are integrated.
After reading this guide, you will have an understanding of how Passport works
when authenticating requests to your application.
