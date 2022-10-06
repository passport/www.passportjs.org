OAuth 2.0 is an authorization framework that enables an application to obtain
access to an API.  This access is granted with the consent of the user whose
information is protected by the API.  Once granted, the application can then use
the API to read, create, and/or modify information that the user has permitted
the application to access.

OAuth 2.0 can appear quite mysterious to developers, especially to those not
familiar with implementing security-related functionality.  Even identity
experts acknowledge the complexities of OAuth 2.0 and how it is used to provide
authentication and authorization functionality.

Fortunately, Passport makes it easy to integrate OAuth 2.0 without having to
know the underlying details of the protocol.  While this allows developers to
quickly add authentication and authorization to an application, it can also seem
like "magic" and enhance the mystery.

This guide provides an overview of OAuth 2.0 and analyzes how the protocol
operates.  It details how Passport works when implementing OAuth 2.0-based
authentication and authorization.  This guide will help demystify OAuth 2.0,
giving you a better understanding of how it works in your application.






---

When authorization is granted to identity data, this allows OAuth to be used for
authentication and single sign on.  Authorization can be granted for additional resources
beyond just identity APIs, allowing for use both authentication and authorization.

OAuth describes itself as a framework, and there are many types of extensible authorization grants.
This guide focuses on what is known as the authorization code grant type.


Comment about OAuth 1.0.   It's a fundamentally different protocol, builds on deployment
experience.  Not backwards compatible, may co-exist.


Protocol Flow

1. User clicks link to login with facebook
   that sends a request to the route with passport.authenticate()
2. Passport redirects the user to the service using OAuth 2.0 authorization code flow
   where our app is requesting access to the user's identity information, and any
   other resources indicated by scope.

3. Facebook does its thing to authenticate the user and obtain consent.  Once
   authorized Facbook redirects back to our app with an authorization code
4. App exchanges authorization code for an access token and verifies state.
5. Facebook validates the code and our client credentials and issues an access token
6. App uses access token to access identity information
7. Passport calls verify with profile, and access token.   Access token can be saved
   by the app if it wants to access additional APIs beyond identity.

OAuth 2.0 is nominally an authorization protocol.  Let's exampine what that means and
explain how that enables authentication.


etc


