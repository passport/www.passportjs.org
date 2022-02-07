A bearer token is a type of token that can be used by a client application to
gain access to an API or remote service using only the token itself.

An example will help illustrate.  Let us suppose an application has been issued
the string `SlAV32hkKG` as a token.  The application wishes to use this token to
obtain information about a user.  The application can do so by making the
following HTTP request:

```http
GET /userinfo HTTP/1.1
Host: api.example.com
Authorization: Bearer SlAV32hkKG
```

As illustrated in the request, the token string `SlAV32hkKG` is being used
direcly in the HTTP `Authorization` header.  No additional credentials are
present in the request.

Bearer tokens derive their name from [bearer instruments](https://en.wikipedia.org/wiki/Bearer_instrument).
The holder of a bearer instrument, such as a bond, is presumed to be the owner
of that bond and whoever is physically in possession of the bond is entitled to
dividend payments.  No additional proof of ownership is required.

Similarly, any application in possession of a bearer token is entitled access
to any APIs which accept the token, with whatever permissions the token conveys.

Bearer tokens are typically issued to clients as the result of an OAuth 2.0
authorization flow, where they are known as access tokens.  The token is then
used by the client to access an HTTP resource using the `Bearer` scheme defined
by [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750), as illustrated
above.  RFC 6750 was specified in the [IETF](https://www.ietf.org/) by the
[OAuth Working Group](https://datatracker.ietf.org/wg/oauth/about/), reinforcing
the pairing of bearer tokens and OAuth 2.0.

That being said, bearer tokens can be obtained by client applications without
OAuth 2.0.  For instance, it is common, especially in developer-centric
applications, for a user to generate an "API key" and then copy that API key
into a script or application that is being developed.  Such an API key is a
bearer token, but manually generated and fed into an application by the user,
rather than requested by and issued to the application via OAuth 2.0.
