// # Tutorial Getting Started with GraphQL.js on NodeJS
// 
// ##  Topics 
// This collection of mini-tutorial is a fork from the [Getting Started With GraphQL.js](https://graphql.org/graphql-js/)
// official guide, so you will find some personal notes and summaries I took during my learning of it.
// 
// It covers the following points:
//   *  Basic GraphQL execution (Tut.1)
//   *  GraphQL use through API endpoints (Tut.2)
//   *  Input sending to GraphQL by API (Tut.2, Tut.3, Tut.4)
//   *  
//
// ## Requisites:
//  *  [NodeJS](https://nodejs.org/en/download/) installed in your machine
//  *  [express](https://www.npmjs.com/package/express) module
//  *  [gragphql, express-graphql](https://graphql.org/graphql-js/running-an-express-graphql-server/) modules
//
// ## How to use it:
// The code is all commented by stars <b>/*</b> or by double frontslashes <b>//</b>, 
// so to "activate" a Tutorial, you just have to decomment the stars starting from the title of the specific tutorial.
// Example: To activate the first one, TUTORIAL 1, you have to remove <b>/*</b> on line 27 and <b>*/</b>on line 58.
//




/*//## TUTORIAL 1:
// @target: Run GraphQL
// @source: [Getting Started](https://graphql.org/graphql-js/)
// GQL needs:
// * a Schema to define the QueryType;
// * an API root containing a resolver function for each endpoint
//
// They operate like QueryType:What, resolver:How, always together.
var { graphql, buildSchema } = require('graphql');
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`  // deepened in Tut.3, about Basic Types
  type Query {
    hello: String
  }
`);
// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};
// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});
*/


/*//## TUTORIAL 2:
//@target: Using GraphQL with API Endpoints
//@source: [Running an Express GraphQL Server](http://graphql.github.io/graphql-js/running-an-express-graphql-server/)
//You can link GQL to a server API, in order to make calls to the API using graphQL.
//A simple way is using Express:
//  1.  Define Schema and root;
//  2.  Launch graphql through *express*, as endpoint already set by *express-graphql*
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,     //all you need is this
  rootValue: root,    //   ...and this
  graphiql: true,
}));
app.listen(4005);
console.log('Running a GraphQL API server at localhost:4005/graphql');
// Now you will see GraphiQL at http://localhost:4005/graphql
// Try to type: { hello } and launch
// Alternatively you can open a dev console in your browser at and paste
// ```javascript
// fetch('/graphql', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({query: "{ hello }"})  //<-- hardcoded, no variables inside query
// })
//   .then(r => r.json())
//   .then(data => console.log('data returned:', data));
// ```
*/






/*
// ## TUTORIAL 3:
// @source: [Basic Types](http://graphql.github.io/graphql-js/basic-types/)
// @target: Basic Types for queries
// Scalar Types supported: 
// *  String
// *  Int
// *  Float
// *  Boolean
// *  ID
// Rules:
// *  They are 
// *  They are nullable.
// *  To make not nullable you must put after a !. Ex: String -> String! .
// *  *List Types* come with square brackets, [].  Ex: String -> [String] .
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
// Are you understanding that the Schema comprises all of your queryTypes, defining WHAT you are ready to return....
var schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);
// ...and that in root, through your resolvers, you will define HOW a call to a queryType will return a result? (cf. Tut.1)
var root = {                
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
};
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4005);
console.log('Running a GraphQL API server at localhost:4005/graphql');
// Launch this and open the address with your browser.
// Write one of your QueryTypes in GraphQL and run the query many times, you'll see the result changing according your resolvers functions.
*/




/*// ## TUTORIAL 4
// @source: [Passing Arguments](http://graphql.github.io/graphql-js/passing-arguments/)
// @target: Variable Inputs to GraphQL 
// Resolver functions accept only one argument. 
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
// The schema. Notice the <i><b>Int!</b></i>* value.
var schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);
// The root 
var root = {
  rollDice: function ({numDice, numSides}) {  //Here you can destructure the single argument, in order to tidy your structure
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
};
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4005);
console.log('Running a GraphQL API server at localhost:4005/graphql');
//  *  Execution in GraphiQL
// Launch this and open the address with your browser.
// Run ```javascript {rollDice} ```and see the Error raised. This happens  since you defined rollDice having two arguments.
// Run ```javascript {rollDice(numDice: 3, numSides: 6)} ```to see a success result.
//  *  Execution by code
//  You can code the last call above. See the example below. Take care at the body field of *fetch*.
// ```javascript
// var dice = 3;
// var sides = 6;
// var query = `query RollDice($dice: Int!, $sides: Int) { //You can pack up a query to use straightforwaedly with specific values.
//   rollDice(numDice: $dice, numSides: $sides)
// }`;
// fetch('/graphql', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({
//     query,                         //The canned query
//     variables: { dice, sides },    //The variables
//   })
// })
//   .then(r => r.json())
//   .then(data => console.log('data returned:', data));
// ```
*/


/*// ## TUTORIAL 5
// @source: [Object Types](http://graphql.github.io/graphql-js/object-types/)
// @target: Define Object Types for the output of the query
//
// So far we passed plain Query types and root resolver, in other words, something like a reference to an ouput and the function that generates it.
// New Object Types can be defined in order to handle the output and treat the functions as methods of it.
// To do so we have
//  * to define new Object types, say NoT{ out1: type1, out2:type2, .. }
//  *  related solver *class* (not function anymore).
// 
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
// Here we can define a RandomDie object as type for the output of getDie Query Type
var schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }
  type Query {
    getDie(numSides: Int): RandomDie
  }
`);
// Here we define the behaviour of the RandomDie Object Type and its methods
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }
  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }
  roll({numRolls}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}
// We provide to root the solver for getDie, having output type RandomDie
var root = {
  getDie: function ({numSides}) {
    return new RandomDie(numSides || 6);
  }
}
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4005);
console.log('Running a GraphQL API server at localhost:4005/graphql');
// Running GraphiQL and writing the query below, you'll see the result
// ```javascript
// {
//   getDie(numSides: 6) {
//     rollOnce
//     roll(numRolls: 3)
//   }
// }
// ```
// Keep in mind that you can't ask for a RandomDie Object typing with getDie(numSides: 6), because *you must specify at least
// one field* in your query.
*/





/*// ## TUTORIAL 6:
// @source: [Mutations and Input Types](http://graphql.github.io/graphql-js/mutations-and-input-types/)
// target: Alter data in database
// How to perform <b>changes</b> on your DB? With Mutations. Mutations are like queries. Query Type is for retrieving
// informations already in DB, Mutation Type is for altering data.
//    Query:get = Mutation:set .
// They also have specific types: input.
//    => Type:Query:get = Input:Mutation:set .
//
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
// GraphiQL: <br>
// ```javascript
// mutation {
//   createMessage(input: {
//     author: "andy",
//     content: "hope is a good thing",
//   }) {
//     id
//   }
// }
// ```
// It will return the id of the message just created, say IDRETURNED. Now if you run a query as getMessage<br>
// GraphiQL: <br>
// ```javascript
// {
//   getMessage(input: {
//     id: IDRETURNED
//   }) {
//     id
//   }
// }
// ```
// And you'll obtain the properties of the message you asked, in this case the id.<br>
// You can obtain the same result (with different ID obviously) performing the operation on the browser console.
// browser console: <br>
// ```javascript
// var author = 'andy';
// var content = 'hope is a good thing';
// var query = `mutation CreateMessage($input: MessageInput) {
//   createMessage(input: $input) {
//     id
//   }
// }`;
//
// fetch('/graphql', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({
//     query,
//     variables: {
//       input: {
//         author,
//         content,
//       }
//     }
//   })
// })
//   .then(r => r.json())
//   .then(data => console.log('data returned:', data));
// ```
*/


/*// ## TUTORIAL 7:
// @source: [Authentication and Express Middleware](http://graphql.github.io/graphql-js/authentication-and-express-middleware/)
// target: Manage Request object
// The request/response objects are available to be processed by GraphQL. You can handle them as you'll do in other situations, such like dealing with middleware.
// Just access them through a *Middleware function*, visit (this page)[https://expressjs.com/en/guide/writing-middleware.html] for more info about Middleware functions.
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var schema = buildSchema(`
  type Query {
    ip: String
  }
`);
function loggingMiddleware(req, res, next) {
  console.log('ip:', req.ip);
  next();
}
var root = {
  ip: function (args, request) {
    return request.ip; //try: request.host
  }
};
var app = express();
app.use(loggingMiddleware);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4005);
console.log('Running a GraphQL API server at localhost:4005/graphql');
//Now, as suggested by your Query declaration, run in GraphiQl the code below to have the ip of the request.
// ```javascript
// {
//   ip
// }
// ```
// For more info check (Request and Response Objects)[https://nodejs.org/api/http.html#http_class_http_clientrequest] reference.
*/
