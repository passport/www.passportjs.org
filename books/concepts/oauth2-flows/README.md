# OAuth 2.0 Flows

OAuth 2.0 is an authorization framework that enables an application to obtain
access to an API.  OAuth 2.0 supports a wide variety of applications, ranging
from traditional web applications in which most of the logic resides on the
server-side, to single-page applications (SPAs) which rely heavily on
client-side JavaScript executing in a browser, and even native applications
running on a desktop or mobile operating system.

In order to support this assortment of applications, OAuth 2.0 provides an
extensible set of _flows_.  A flow determines how an application obtains an
access token.  A flow, in conjunction with the type of application, impact the
security considerations when storing and using that access token.  
