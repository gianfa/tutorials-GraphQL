// # How to launch GraphQL on server and use it
// #### A complete starter recipe

// ### What's needed
// 1. A NodeJS server running;
//     * GraphQL running on it;
// 2. A client sending messages to through server to GraphQL;
// This is the minimum needed in order to have at least a simple server-client interaction.

// ### Steps to do it
// In order to perform a simple interaction with the server we need a client sending a request.
// In this example we will POST a request to GraphQL using *request* module, through a function.  
// These are the main steps:
// 1. Write the query (/mutation);
// 2. Create the function that will handle the request
//    1. The request must be directed directly to graphql endpoint;
//    2. Its body must be composed by the query (/mutation) and the input variables relative to the query (/mutation).
// 3. Declare the variables and the function invocation.
// 4. From a new Terminal open the directory of this file and run:
//    ```bash
//       $ node com_client
//       # null '{"data":{"createMessage":{"id":"c67419f8a98d9b88d0d7"}}}'
//    ```
// CAVEAT: you now should have *TWO* open Terminals: one in which is running the GraphQL server while the second runs the client.



// We will start from the code of the Tut.6 in the [Basics subrepository](https://github.com/gianfa/tutorials-GraphQL/tree/master/Basics).

// 1. Set the server with GraphQL.

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
// Hint: Before to read it all take a look to the last, type Mutation.
var schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

// If Message had any complex fields, we'd put them on this object.
class Message {
  constructor(id, {content, author}) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

// Maps username to content
var fakeDatabase = {};

var root = {
  getMessage: function ({id}) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    return new Message(id, fakeDatabase[id]);
  },
  createMessage: function ({input}) {
    // Create a random id for our "database".
    var id = require('crypto').randomBytes(10).toString('hex');

    fakeDatabase[id] = input;
    return new Message(id, input);
  },
  updateMessage: function ({id, input}) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
};


var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4005, () => {
  console.log('Running a GraphQL API server at localhost:4005/graphql');
});


// 2. Now open the com_client.js to keep going with this..
