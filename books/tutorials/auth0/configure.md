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

We are going to use Passport and the `passport-openidconnect` strategy.
Install both as dependencies:

```sh
$ npm install passport
$ npm install passport-openidconnect
```
