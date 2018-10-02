# Getting Started tutorial with GraphQL.js on NodeJS

##  Topics 
This collection of mini-tutorials is a fork from the [Getting Started With GraphQL.js](https://graphql.org/graphql-js/)
official guide, so you will find some personal notes and summaries I took during my learning of it.

It covers the following points:
  *  Basic GraphQL execution (Tut.1)
  *  GraphQL use through API endpoints and request/response handling (Tut.2, Tut.7)
  *  Reading operations (Tut.2, Tut.3)
  *  Types (Tut.4, Tut.5)
  *  Writing operations (Tut.6)

## Requirements:
 *  [NodeJS](https://nodejs.org/en/download/) installed in your machine
 *  [express](https://www.npmjs.com/package/express) module
 *  [gragphql, express-graphql](https://graphql.org/graphql-js/running-an-express-graphql-server/) modules

## How to use it:
The code is all commented by stars <b>/\*</b> or by double frontslashes <b>//</b>, 
so to "activate" a Tutorial, you just have to decomment the stars starting from the title of the specific tutorial.
Example: To activate the first one, TUTORIAL 1, you have to remove <b>/\*</b> on line 27 and <b>\*/</b>on line 58.

## Headers of the Tutorials:
#### TUTORIAL 1:
target: Run GraphQL
<br>source: [Getting Started](https://graphql.org/graphql-js/)
GQL needs:
* a Schema to define the QueryType;
* an API root containing a resolver function for each endpoint

They operate like QueryType:What, resolver:How, always together.

#### TUTORIAL 2:
target: Using GraphQL with API Endpoints
<br>source: [Running an Express GraphQL Server](http://graphql.github.io/graphql-js/running-an-express-graphql-server/)
You can link GQL to a server API, in order to make calls to the API using graphQL.
A simple way is using Express:
 1.  Define Schema and root;
 2.  Launch graphql through *express*, as endpoint already set by *express-graphql*


#### TUTORIAL 3:
target: Basic Types for queries
<br>source: [Basic Types](http://graphql.github.io/graphql-js/basic-types/)
<br>Scalar Types supported: 
*  String
*  Int
*  Float
*  Boolean
*  ID<br>

Rules:
*  They are nullable.
*  To make not nullable you must put after a !. Ex: String -> String! .
*  *List Types* come with square brackets, [].  Ex: String -> [String] .

#### TUTORIAL 4
target: Variable Inputs to GraphQL 
<br>source: [Passing Arguments](http://graphql.github.io/graphql-js/passing-arguments/)
<br>Resolver functions accept only one argument. How to deal with it.

#### TUTORIAL 5
target: Define Object Types for the output of the query
<br>source: [Object Types](http://graphql.github.io/graphql-js/object-types/)
New Object Types can be defined in order to handle the output and treat the functions as methods of it.
<br>To do so, we have
 * to define new Object types, say NoT{ out1: type1, out2:type2, .. }
 *  related solver *class* (not function anymore).

#### TUTORIAL 6:
target: Alter data in database
<br>source: [Mutations and Input Types](http://graphql.github.io/graphql-js/mutations-and-input-types/)
Mutations are very like Queries, but for writing, while the latter are for reading.


#### TUTORIAL 7:
target: Manage Request object
<br>source: [Authentication and Express Middleware](http://graphql.github.io/graphql-js/authentication-and-express-middleware/)<br>
The request/response objects are available to be processed by GraphQL. Let's see how.

