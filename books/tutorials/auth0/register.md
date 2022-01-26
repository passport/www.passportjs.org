# Create App

Before we can use Auth0 for sign in, we need to create an app in Auth0.

Go to the [Auth0 Dashboard](https://manage.auth0.com/).

Navigate to **Applications**.

If you have an existing application, it will be listed on the applications
screen.  Click the application to obtain the client ID and secret, and
proceed to [configure the strategy](../configure/).  Otherwise, continue.

Click **Create Application**.

Enter a name for the application and choose **Regular Web Applications** as the
application type.  Click the **Create** button.

On the following screen, click the **Settings** tab.  Scroll down and find the
**Allowed Callback URLs** text area.  Enter `'http://localhost:3000/oauth2/redirect'`.
Scroll down futher and click **Save Changes**.

Scroll up to the top and find the **Domain**, **Client ID**, and **Client
Secret** values for the newly created app.  Next, we will use these values to
[configure the strategy](../configure/).


