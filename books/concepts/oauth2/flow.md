# Protocol Flow

OAuth 2.0 is an authorization framework that supports a wide range of
applications.  The framework does this through an suite of extensible grant
types.  These grant types are often referred to as _flows_, as they determine
the user experience when granting authorization.

This guide explains the _authorization code_ flow.  This is the flow used by
server-side web applications.  The user interacts in this flow via their web
browser, and the protocol itself makes extensive use of HTTP redirections.
This flow proceeds through three steps:

  1. The application [requests authorization](../authorization/) from the user
     by redirecting the user to the authorization server, which will obtain the
     user's consent.
  2. The application receives an authorization code representing the user's
     authorization, which it [exchanges for an access token](../token/).
  3. The application uses the access token to [request protected
     resources](../profile/).

Each of these steps are examined in detail in the next chapters.
