# Register App

In the [previous section](../redirect/), you added a route which redirects the
user to Google when they click "Sign in with Google."  In this section, you'll
register the app with Google so that it can make use of Google's APIs.

Go to the [Google Cloud Platform console](https://console.cloud.google.com/).

From the projects list, select a project or create a new one.

Navigate to the [APIs & Services](https://console.cloud.google.com/apis) page
and select [Credentials](https://console.cloud.google.com/apis/credentials).

If you have an existing application, it will be listed under **OAuth 2.0 Client
IDs**.  Click **Edit OAuth client** to obtain the client ID and secret, and
proceed to [configure the strategy](../configure/).  Otherwise, continue.

If you have not already done so, [configure](https://support.google.com/cloud/answer/10311615)
the [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent).
Select **External** to make your application available to any user with a Google
account.  Complete the app registration process by entering the app name,
support email, and developer contact information.

Click **Create Credentials**, then select **OAuth client ID**.

Select **Web application** as **Application type**.

Click **Add URI** under **Authorized Redirect URIs**.  Enter
`http://localhost:3000/oauth2/redirect/google`.

Click **Create** to create the OAuth client.  The following screen will display
your client ID and secret.  Proceed to [configure the strategy](../configure/).
