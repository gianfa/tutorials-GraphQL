# How to launch GraphQL on server and use it
#### A complete starter recipe

### What's needed
1. A NodeJS server running;
    * GraphQL running on it;
2. A client sending messages to through server to GraphQL;
This is the minimum needed in order to have at least a simple server-client interaction.

### Steps to do it
In order to perform a simple interaction with the server we need a client sending a request.
In this example we will POST a request to GraphQL using *request* module, through a function.  
These are the main steps:
1. Write the query (/mutation);
2. Create the function that will handle the request
   1. The request must be directed directly to graphql endpoint;
   2. Its body must be composed by the query (/mutation) and the input variables relative to the query (/mutation).
3. Declare the variables and the function invocation.
4. From a new Terminal open the directory of this file and run:
   ```bash
      $ node com_client
      # null '{"data":{"createMessage":{"id":"c67419f8a98d9b88d0d7"}}}'
   ```
CAVEAT: you now should have *TWO* open Terminals: one in which is running the GraphQL server while the second runs the client.
