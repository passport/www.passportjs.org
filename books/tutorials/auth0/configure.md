# Configure Strategy

Now that we've created an app in Auth0, we can configure Passport to integrate
with Auth0.

First, let's create a `'.env'` file to store the domain, client ID, and client
secret we just obtained from Auth0.

```sh
$ touch .env
```

Then, add the domain, client ID and secret.  The contents of the file should
look something like this:

```sh
AUTH0_DOMAIN=__INSERT_DOMAIN_HERE__
AUTH0_CLIENT_ID=__INSERT_CLIENT_ID_HERE__
AUTH0_CLIENT_SECRET=__INSERT_CLIENT_SECRET_HERE__
```

For this integration, we are going to use Passport and the
`passport-openidconnect` strategy.  Install both as dependencies:

```sh
$ npm install passport
$ npm install passport-openidconnect
```

Now, let's create a file that will contain authentication-related functionality:

```sh
$ touch routes/auth.js
```

Add the following code to that file, which configures the strategy to work with
Auth0.

```js
var passport = require('passport');
var OpenIDConnectStrategy = require('passport-openidconnect');

passport.use(new OpenIDConnectStrategy({
  issuer: 'https://' + process.env['AUTH0_DOMAIN'] + '/',
  authorizationURL: 'https://' + process.env['AUTH0_DOMAIN'] + '/authorize',
  tokenURL: 'https://' + process.env['AUTH0_DOMAIN'] + '/oauth/token',
  userInfoURL: 'https://' + process.env['AUTH0_DOMAIN'] + '/userinfo',
  clientID: process.env['AUTH0_CLIENT_ID'],
  clientSecret: process.env['AUTH0_CLIENT_SECRET'],
  callbackURL: '/oauth2/redirect',
  scope: [ 'profile' ]
}, function verify(issuer, profile, cb) {
  return cb(null, profile);
}));
```

Now that the strategy is configured, we are ready to [add login routes](../routes/)
to the app.
