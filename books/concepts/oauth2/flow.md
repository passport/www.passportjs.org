# Protocol Flow

OAuth 2.0 is an authorization framework that supports a wide range of
applications.  The framework does this through a suite of extensible grant
types.  These grant types are often referred to as _flows_, as they determine
the user experience when granting authorization.

This guide explains the _authorization code_ flow.  This is the flow used by
server-side web applications.  The user interacts in this flow via their web
browser, and the protocol itself makes extensive use of HTTP redirections.
This flow proceeds through these steps:

  1. The application [requests authorization](../authorization/) from the user
     by redirecting the user to the authorization server.
  2. The authorization server authenticates the user and obtains the user's
     consent, permitting the application to access protected resources via an
     API.
  3. The authorization server redirects the user back to the application with an
     authorization code, representing the authorization obtained from the user.
  4. The application [exchanges the authorization code](../token/) for an access
     token.
  5. The application uses the access token to [request protected
     resources](../profile/).

Each of these steps are examined in detail in the next chapters.
