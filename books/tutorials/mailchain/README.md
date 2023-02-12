# Introduction

Mailchain is the communication layer for Web3 offering private, end-to-end encrypted email using
blockchain wallet addresses and web3 identities (e.g. an Ethereum address, ENS name, Unstoppable
Domains name, etc.). Instead of users needing to sign data with a blockchain wallet, passwordless
authentication with magic links for Passport.js improves the safety of users:

* User signup and login without passwords or needing to sign data
* Supports magic links sent to ENS names, Ethereum addresses, Mailchain accounts and more
* Handles secure token generation, expiration and confirmation

In this tutorial, we will build a todo list app in this tutorial, complete with functionality
that allows users to sign in with Mailchain.  By following along with this tutorial, you will
learn how to use Passport for authentication.

If you want to see where we are headed, here's an example of the final result:
[https://github.com/passport/todos-express-mailchain](https://github.com/passport/todos-express-mailchain)

Before we dive in, you'll need a working development environment with [Node.js](https://nodejs.org/)
and [Git](https://git-scm.com/), as well as an editor and terminal of your
choosing.  Take a moment to set up these tools if you have not already done so.

You'll also need a [Mailchain](https://mailchain.com/) account.  If you don't
already have one, it's free to sign up.

Let's get started!

We are going to start with a starter app, which has all the scaffolding needed
to build a todo list.  Let's clone the app:

```sh
$ git clone https://github.com/passport/todos-express-starter.git mailchain-tutorial
```

You now have a directory named `'mailchain-tutorial'`.  Let's `cd` into it:

```sh
$ cd mailchain-tutorial
```

Take a moment browse through the files in the starter app.  As we work through
this tutorial, we'll be using [Express](https://expressjs.com/) as our web
framework, along with [EJS](https://ejs.co/) as our template engine and [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
for styling.  We will use [SQLite](https://github.com/mapbox/node-sqlite3) as
our database for storing data.  Don't worry if you are not familiar with these
technologies -- the necessary code will be provided at each step.

Now, let's install the dependencies:

```sh
$ npm install
```

And start the server:

```
$ npm start
```

Let's check to see if its working.  Open [http://localhost:3000](http://localhost:3000)
in your browser.  You should be greeted with a page explaining how todos help
you get things done.

Next, we will [add a login page](prompt/) to the app.
