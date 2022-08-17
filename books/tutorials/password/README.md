# Introduction

This tutorial guides you through building _Todos_ - an app for keeping track of
tasks that need to get done.  People access their individual to-do list by
signing in to their existing account, or signing up for a new account.

You'll start by building a page that allows users to sign in with a username and
password.  Then you'll add session management and sign out functionality.
Finally, you'll build a page that allows users to sign up for a new account.

If you want to see where you are headed, here's an example of the final result:
[https://github.com/passport/todos-express-password](https://github.com/passport/todos-express-password)

To build this app, you'll need a working development environment with [Node.js](https://nodejs.org/)
and [Git](https://git-scm.com/), as well as an editor and terminal of your
choosing.  Take a moment to set up these tools if you have not already done so.

Let's get started!

Clone the starter app, which has all the scaffolding needed to build a to-do
list.

```sh
$ git clone https://github.com/passport/todos-express-starter.git username-password-tutorial
```

You now have a directory named `username-password-tutorial`.  Change into it.

```sh
$ cd username-password-tutorial
```

Take a moment to browse through the files in the starter app.  As you work
through this tutorial, you'll be using [Express](https://expressjs.com/) as a
web framework, along with [EJS](https://ejs.co/) as a template engine and [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
for styling.  You will use [SQLite](https://www.sqlite.org/) as a database for
storing data.  Don't worry if you are not familiar with these technologies --
the necessary code will be provided at each step.

Next, install the dependencies.

```sh
$ npm install
```

And start the server.

```sh
$ npm start
```

Check to see if its working.  Open [http://localhost:3000](http://localhost:3000/)
in your browser.  You should be greeted with a page explaining how _Todos_ helps
you get things done.

Next, you will [add a signin page](prompt/) to the app.
