# Set Up Mailchain

Now we need a way to send [Mailchain](https://mailchain.com/) messages from our
app.

For the purposes of this tutorial, we suggest you create a Mailchain account for
testing.

Navigate to [Mailchain](https://app.mailchain.com/register) and follow the steps
to register.

You will be prompted to save your Secret Recovery Phrase, which we will use
later.

You can also retrieve your Secret Recovery Phrase at any time by navigating to
**Settings >
[Secret Recovery Phrase](https://app.mailchain.com/settings/security/)**. Then
click **View** and enter your password to retrieve your Secret Recovery Phrase.

Save your Secret Recovery Phrase somewhere safe and private. We will use it
later.

Now that we have the Secret Recovery Phrase and a Mailchain address, let's
create a `'.env'` file to store them.

```sh
$ touch .env
```

Add your FROM_ADDRESS and API key. The contents of the file should look
something like this:

```sh
FROM_ADDRESS=user@mailchain.com
SECRET_RECOVERY_PHRASE=__INSERT_SECRET_RECOVERY_PHRASE__
```

We also need to update our database schema to store a user's Mailchain address
and verification status. Open `'db.js'` and insert the following at line 16:

```js
mailchain_address TEXT UNIQUE, \
mailchain_address_verified INTEGER, \
```

We will now delete the database and re-create it. NOTE: This will delete any
data you may have added in this tutorial so far. If you are considering adding
this solution to an existing app, you would simply run a DB migration to alter
your `users` table.

```sh
$ rm ./var/db/todos.db
```

Next we will [configure the strategy](../configure/).
