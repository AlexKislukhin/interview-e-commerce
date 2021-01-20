In the server folder you'll have to create .env file with following values:

-   SESSION_SECRET - secret for the sessions;
-   MONGODB_URI - uri to connect to mongodb;
-   PORT - port, on which server will run;
-   CORS_CLIENT_URL - client url for cors action (not required);

In the client .env file:

-   REACT_APP_API_URL - url to the server
-   REACT_APP_PRODUCT_LIMIT - rate, at which products will be parsed

then run `npm start`
