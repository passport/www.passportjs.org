# Accessing User Profile

Now that the application has been issued an access token, it can use that token
to make authenticated API requests.  We'll explore how that is accomplished in
this chapter.

Passport now makes a request to the Twitter API, in particular the
[`/account/verify-credentials.json`](https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/get-account-verify_credentials)
endpoint, which returns data about the user's account:

```http
GET /1.1/account/verify_credentials.json HTTP/1.1
Host: api.twitter.com
Authorization: OAuth oauth_consumer_key="cChZNFj6T5R0TigYB9yd1w",
  oauth_nonce="MCMqk9QRZcPG1CrfJbPtD9HuMvm8vSXb",
  oauth_signature_method="HMAC-SHA1",
  oauth_timestamp="1682559265",
  oauth_token="7588892-kagSNqWge8gB1WwE3plnFsJHAZVfxWD7Vb57p0b4",
  oauth_version="1.0",
  oauth_signature="XXXXXXXX"
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
     
{
  "id": 38895958,
  "id_str": "38895958",
  "screen_name": "theSeanCook",
  "name": "Sean Cook"
}
```
