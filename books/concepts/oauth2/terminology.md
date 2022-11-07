# Terminology

In order to understand OAuth 2.0, it is first necessary to define the
fundamental concepts used within the protocol.  To make these concepts easier to
grasp, this guide will analyze OAuth 2.0 in the context of a common real-world
scenario: logging in with [Facebook](https://www.facebook.com/) and accesing the
Facebook [Graph API](https://developers.facebook.com/docs/graph-api).  That
said, the concepts themselves apply to other OAuth 2.0-powered services, and the
details described in this guide are not specific to Facebook.

In this scenario, your application will prompt the user to log in with Facebook.
Facebook will then authenticate the user.  Once Facebook has obtained the user's
consent, Facebook will issue an access token to your application.  Your
application then uses the access token to access the Graph API.

In OAuth 2.0 terminology, Facebook is an _authorization server_ (AS).  The
purpose of the authorization server is to authenticate the user and obtain
authorization.  Authorization is typically obtained by prompting the user for
their consent.  Once authorization has been obtained, the authorization server
issues access tokens to the application.

The Graph API is a _resource server_ (RS).  The resource server hosts _protected
resources_, which are typically HTTP endpoints and require an access token as
a credential to authenticate a request.  In the case of Facebook, these
resources are friends, posts, photos, and other information people might share
on a social network.

Your application is a _client_.  The client requests authorization from the user
and, if granted, uses the issued access token to access protected resources.

The user is referred to as a _resource owner_.  The resource owner is an entity
that is capable of granting access to a protected resource.  In social
networking scenarios, this is typically the user who created the posts or photos
being accessed.  In enterprise environments, this is often a priviledged
administrator that manages company data.
