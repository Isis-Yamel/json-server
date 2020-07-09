# Home Market JSON Server

JSON server for Home Market internal project.

This project implements "json-server" package with an basic authentication system based on JWT.

You get information about "JSON-Server" in https://github.com/typicode/json-server

## Specific instructions to install 

```npm install```

## Specific instructions to use this server

Enter this command to start your API REST server (authenticated mode):

```node index```

or 

```npm run start```

Enter this command to start your API REST server (non-authenticated mode):

```npm run noauth```

In this case, JSON server starts on Port 3333 and uses a json file the path: "database/db.json".

Port configuration and JSON file can be configured via args:

```node index --file=./json-samples/series.json --port=3000```

### Auth system routes

* **Login**: /login
* **Verify user**: /verify (This route only tests the authenticity of a token)

Send to /login route a POST request with user object in body, like this:

```{email: "user@example.com", password: "1234"}```

Send to "/verify" route the auth token in the HTTP headers.

```
{
  "Content-Type': "application/json",
  "token": "Put_here_the_token"
}
```

Valid users are the ones that you can find in /users. If you want to modify that information, you can do it from db.json file

### API Authenticated routes vs API Public routes

* /db and /users produced by JSON Server are public routes.
* Other HTTP methods (GET,POST, PUT, DELETE, PATCH) are behind authenticated routes (if you start the server in authenticated mode)

Like "/verify" route, send the token in headers to authenticated API routes, otherways you will get an 401 error response:

```
{
  "Content-Type': "application/json",
  "token": "Put_here_the_token"
}
```

Token is valid for 4 hours (you can change it in security/jwt.js file)

### Available routes

Please visit https://www.npmjs.com/package/json-server to know all available routes/results by default.

#### Backup Initial Database

You can find the initial database information in /database/first_db.json
