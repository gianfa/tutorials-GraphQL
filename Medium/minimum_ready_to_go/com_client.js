//... continuation from com_server.js
//
// In order to perform a simple interaction with the server we need a client sending a request.
// Here we will POST a request to GraphQL using *request* module, through a function.
// These are the main steps:
// 1. Write the query (/mutation);
// 2. Create the function that will handle the request
//   1. The request must be directed directly to graphql endpoint;
//   2. Its body must be composed by the query (/mutation) and the input variables relative to the query (/mutation).
// 3. Declare the variables and invoke the function
// 4. From a new Terminal open the directory of this file and run:
//    ```bash
//       >node com_client
//       # null '{"data":{"createMessage":{"id":"c67419f8a98d9b88d0d7"}}}'
//    ```
// CAVEAT: you now should have *TWO* open Terminals: one in which is running the GraphQL server while the second runs the client.

// 1. Write the query (/mutation);
var query_or_mut   = `mutation CreateMessage($input: MessageInput) {
  createMessage(input: $input) {
    id
  }
}`;

// 2. Create the function
var request = require('request');
function sendMessageToServer(author, content) {
    let options = {
        method: 'POST',
        uri: 'http://localhost:4005/graphql', // Request must be directed to graphql endpoint;
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        body: JSON.stringify({
            query_or_mut,
            variables: {
                input: {
                author,
                content,
                }
            }
        })
    }
    request(options, function (error, response) {
        console.log(error,response.body);
        return;
    });
}



//3. Declare the variables and invoke the function
var author  = 'andy';
var content = 'hope is a good thing';
sendMessageToServer(author, content);