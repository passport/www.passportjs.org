# Social Login

[Social login](https://en.wikipedia.org/wiki/Social_login) is an authentication
mechanism that allows users to sign in with an existing account they already
have, such as their [Google](https://www.google.com/) or [Facebook](https://www.facebook.com/)
account.  Social login streamlines the process by which a user accesses web
applications by facilitating [single sign-on](https://en.wikipedia.org/wiki/Single_sign-on).
The need to create an account and remember another password at each new website
is eliminated.  Instead, the user logs in once to their Google or Facebook
account, and can then access any website that supports [Facebook Login](https://developers.facebook.com/docs/facebook-login/)
or [Sign In With Google](https://developers.google.com/identity/gsi/web).

Social login derives its name from the fact that the first consumer-centric
identity services were introduced by social networks, with Facebook, [Twitter](https://twitter.com/),
and [LinkedIn](https://www.linkedin.com/) paving the way.  Despite the name,
social login isn't exclusive to social networks.  Google, [Apple](https://www.apple.com/),
[Microsoft](https://www.microsoft.com/), and [Amazon](https://www.amazon.com/)
all offer identity services for websites to adopt and users to use.  Passport
provides support for all of these, and hundreds more.

Social login makes use of [federated identity](/docs/federated-identity/).  Most
social identity providers implement [OAuth 2.0](/docs/oauth-2/), often in
conjunction with [OpenID Connect](/docs/openid-connect/).  This pairing
constitutes the modern identity protocol suite.  The previous generation of
identity protocols, [OpenID 2.0](/docs/openid/) and [OAuth 1.0](/docs/oauth/),
are still in use at some providers, although usage is gradually diminishing.

Further details about federated identity are provided in a later section of this
guide.  The remainder of this section provides an overview of the most commonly
used social login providers, which can be implemented using Passport without
needing to understand the technical details of the underlying protocols.

TODO: Add user profile details

TODO: Add info about prmopts and challenges, putting login buttons on login page
