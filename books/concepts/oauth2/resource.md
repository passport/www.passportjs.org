# Accessing Resources

Now that the application has been issued an access token, it can use that token
to make authenticated API requests.  We'll explore how that is accomplished in
this chapter.

Before we begin, it should be noted that the OAuth 2.0 protocol aspects of the
sequence are complete.  OAuth 2.0 is used to obtain authorization from the user
(which was done with the authorization request and response) and exchange that
authorization for an access token (which was done with the token request and
response).  At this point, the sequence is transitioning to use HTTP and the
authentication features of that protocol.

Passport now makes a request to the Facebook Graph API, in particular the
[`/me`](https://developers.facebook.com/docs/graph-api/overview/#me) node, which
returns data about the [user](https://developers.facebook.com/docs/graph-api/reference/user/)
whose access token is used to authenticate the API request:

```http
POST /v3.2/me HTTP/1.1
Host: graph.facebook.com
Authorization: Bearer IAxLF5woqmfjTCHRD6gnp9X9RNVK3TG0
```

Note that the access token that was just issued is being used as credential in
the `Authorization` header.  Because the token is a bearer token, it is utilized
by simply including the access token string in the request according to the
`Bearer` scheme, as specified by [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750).

Just as different types of tokens can be returned in the OAuth 2.0 token
response, the HTTP authentication framework allows for an extensible set of
schemes that specify how to include credentials in a request.  This guide only
examines bearer tokens, as they are the most common token type in use today.

When Facebook receives this request, it verifies that the access token is valid
and that the authorization granted permits access to the resource.  If so,
Facebook responds with information about the user.

```http
HTTP/1.1 200 OK
Content-Type: application/json
     
{
  "name": "Alice Smith",
  "id": "14818013739641407"
}
```

Keep in mind that at this point Passport is still processing the authorization
response using a route:

```js
router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login'
}));
```

The user request is interleaved in the middle of processing the authorization
response, after the prior token request.  A visualization of of the requests and
responses that have occured up to this point looks as follows:

Now that Passport has obtained user information, it can [authenticate the user](../authenticate/).
