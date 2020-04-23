# Cookie Sessions Overview

## Where We're Going

For us, the end goal is passwords and authentication.

### The problem:

We're using http requests, so each request is a brand new thing coming to us from the internet. You can dig into the word "Stateless" in the REST acronym if this is interesting to you.

Because each request is a totally different thing as far as our server is concerned, each request needs to prove that it should have access. We could do this a couple of ways:

- Have the user enter their username and password once, store them on the client side, and pass them on every request. The issue here is that every time the user refreshes the page, they would have log back in.
- Store the username and password in cookies on the client side. The issue here is that the next person to use the computer (imagine a library), could look at the cookies and see the user's username and password right there in plain text!

Both of those have issues. There's got to be a better way!

### The Solution

Cookies + Session

The solution is a combination of both of these ideas. The session checks the username and password on the first time through, then, the server sends back a crazy long string (a unique id) to the client. The client stores that crazy long string and instead sends that to the server. When the server receives that crazy long string, it accepts that instead of the username and password. The crazy long string is stored in cookies, so when the page refreshes, it's still there! This way, the client never stores sensitive information in the cookies, and the server still knows that this is the same user, even after a refresh.
