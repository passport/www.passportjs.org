# Introduction

We will build a todo list app in this tutorial, using [Auth0](https://auth0.com/)
for sign in and sign up to our app.  In this tutorial, you will learn how to use
Passport to integrate with Auth0.

If you want to see where we are headed, here's an example of the final result:
[https://github.com/passport/todos-express-auth0](https://github.com/passport/todos-express-auth0)

Before we dive in, you'll need a working development environment with [Node.js](https://nodejs.org/)
and [Git](https://git-scm.com/), as well as an editor and terminal of your
choosing.  Take a moment to set up these tools if you have not already done so.

You'll also need an Auth0 account.  If you don't already have one, [sign up](https://auth0.com/)
now.  This tutorial can be completed using Auth0's free plan.

Let's get started!

We are going to start with a starter app, which has all the scaffolding needed
to build a todo list.  Let's clone the app:

```sh
$ git clone https://github.com/passport/todos-express-starter.git auth0-tutorial
```

You now have a directory named `'auth0-tutorial'`.  Let's `cd` into
it:

```sh
$ cd auth0-tutorial
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

We are going to make the sign in button work.  But first, we need to [create an
app](register/) in Auth0.
