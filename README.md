# Cookie (Session) Clicker

Our hot new game called "Cookie Clicker" is taking off!

The best gamers in the world are now all racing to get high scores in Cookie Clicker! The bad news is that they have started to cheat the system. They found they can edit the client-side code to make their score whatever they wanted!

If you'd like a little more context on sessions before diving in, we included [some session documentation](/documentation/sessions.md) that is a good place to start.

## Base

To start this project, open two terminal tabs. Run `npm run client` in one, and run `npm run server` in the other.

We need to protect our game. We're going to store the user data on the server, but we only want to give users the data that they own. It's time to use a session! Our team has started the transition to the new session. The score is now stored in a session on the server.

You have been brought in as the expert after your excellent work on the previous `name` implementation. Your job is to re-implement allowing users to see their names on the DOM:

- [ ] The username should display on the screen.
- [ ] When a user clicks the `Edit Username` button, the username display should turn into an input, and the button should turn into a `Save` button.
- [ ] When the user selects the save button, it should turn back into an `Edit Username` button, and the input should turn back into a display of the new name.
- [ ] When the user refreshes the page, they should continue to see their name.

To see this working, open a second browser window. Then open an incognito window to create a brand new user with a new cookie.

## Stretch

- [ ] Allow the user to log out by destroying the session, removing the cookie, and setting the name and count to empty strings. Look at the documentation on `cookie-session` for this part: https://www.npmjs.com/package/cookie-session
- [ ] Add a database to this project that saves a user's progress, allows them to log out. To log back in, they just need to have is the right username (included in the `req.body` for the post based on the username input).
    - [ ] Someone posting for the first time should be added to the database with a `click_count` of `1` (since they just hit the post for the first time)
    - [ ] Someone with a username already in the database, should have their `click_count` increase by `1`
- [ ] (BIG stretch) Add a password field to `App.js` that gets sent along with the username in `req.body` in every request. The post and get requests should only work if the username and password match in the database.
    - [ ] Someone posting for the first time should be added to the database with a `click_count` of `1` (since they just hit the post for the first time)
    - [ ] Someone with a username already in the database, should have their `click_count` increase by `1`
- [ ] (BIG BIG stretch) After the first post, we want to stop storing the password on the client side. Remove it from the DOM and don't pass it in `req.body`. Instead, store the password on session on the server.
