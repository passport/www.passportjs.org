# Terminology

In order to understand OAuth 1.0, it is first necessary to define the
fundamental concepts used within the protocol.  To make these concepts easier to
grasp, this guide will analyze OAuth 1.0 in the context of a common real-world
scenario: logging in with [Twitter](https://twitter.com/) and accesing the
Twitter [API](https://developer.twitter.com/en/docs/twitter-api).  That said,
the concepts themselves apply to other OAuth 1.0-protected services, and the
details described in this guide are not specific to Twitter.

In this scenario, your application will prompt the user to sign in with Twitter.
Twitter will then authenticate the user.  Once Twitter has obtained the user's
consent, Twitter will issue an access token to your application.  Your
application then uses the access token to access the API.

In OAuth 1.0 terminology, Twitter is a _service provider_.  A service provider
is a web service that allows access via OAuth.  A service provider authenticates
the user and obtains authorization.  Authorization is typically obtained by
prompting the user for their consent.


The
purpose of the authorization server is to authenticate the user and obtain
authorization.  Authorization is typically obtained by prompting the user for
their consent.  Once authorization has been obtained, the authorization server
issues access tokens to the application.
