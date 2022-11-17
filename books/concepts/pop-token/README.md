# Proof-of-Possession Token

A proof-of-posssion token is a type of token that can be used by a client
application to gain access to an API or remote service using the token along
with demonstrating posession of a cryptographic key.

Proof-of-posession tokens are often referred to as being _sender-constrained_.
When an API endpoint receives a request containing a token, it must determine
whether the sender (i.e. the client application) is legitimately authorized to
present it.

When using bearer tokens, any application in posession of the token is able to
use it to access an API, even if that application obtained the token by
illegitimate means.  Because tokens transit the network, they are subject to
being intercepted and stolen.  The attacker can then use the token, as if it
where the legitimate application, and the API has no way to prevent such usage.


WIP:

Define terms:
presenter
sender-constrained:
holder-of-key:

Other methods:
mTLS
Token Binding

Primary aim is to prevent use of leaked or stolen access tokens
