# Set Up SendGrid

Before we can let users sign in to our app with email, we need a way to send
emails.

For that, we are going to use [SendGrid](https://sendgrid.com/).

Go to the [SendGrid dashboard](https://app.sendgrid.com).

Navigate to **Settings > [API Keys](https://app.sendgrid.com/settings/api_keys)**.

Click **Create API Key**.

Enter `"email-tutorial"` for the **API Key Name**.

Under **API Key Permissions** select **Restricted Access**.  Then, under
**Access Details**, ensure that **Mail Send > Mail Send** is granted full
access.

Click the **Create & View** button.

The following screen will display your API key.  Save it someplace safe, as we
will use it later.

Next, navigate to **Settings > [Sender Authentication](https://app.sendgrid.com/settings/sender_auth)**.

If you've already verified your domain or email address, it will be displayed
here.  If not, click **Get Started** under **Verify an Address** and complete
[single sender verification](https://docs.sendgrid.com/ui/sending-email/sender-verification).

Now that we have an API key and a verified email address, let's create a
`'.env'` file to store them.

```sh
$ touch .env
```

Add your email and API key.  The contents of the file should look something like
this:

```sh
EMAIL=user@example.com
SENDGRID_API_KEY=__INSERT_API_KEY_HERE__
```

Next we will [configure the strategy](../configure/).
