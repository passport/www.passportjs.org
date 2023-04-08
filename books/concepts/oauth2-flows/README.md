# OAuth 2.0 Flows

OAuth 2.0 is an authorization framework that enables an application to obtain
access to an API.  OAuth 2.0 supports a wide variety of applications, ranging
from traditional web applications in which most of the logic resides on the
server-side, to single-page applications (SPAs) which rely heavily on
client-side JavaScript executing in a browser, and even native applications
running on a desktop or mobile operating system.

In order to support this assortment of applications, OAuth 2.0 provides an
extensible set of _flows_.  A flow determines how an application obtains an
access token.  The characteristics of a flow, along with the characteristics of
the application itself, impact the security considerations that need to be taken
into account when using OAuth 2.0.

This guide provides an brief overview of the most commonly used OAuth 2.0 flows.
It then outlines how those flows are used by different types of applications.
After reading this guide, you will have a better understanding of which OAuth
2.0 flow to use in which types of applications, and how to use Passport to
authenticate users using those applications.
