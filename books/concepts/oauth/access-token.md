# Obtain Access Token

Once the user has granted access, the application can exchange the request token
for an _access token_.  To obtain a request token, the application makes
a request to the service providers's _access token URL_ (`/oauth/access_token`,
in the case of Twitter):

TODO

Let's examine the parameters in this request.


If the authorization request is valid and authorized, Twitter issues an access
token:

Let's examine the parameters in this response.

Now that the application has obtained an access token, it can [access the user
profile](../profile/).
