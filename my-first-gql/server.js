const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const db = require('./db');

const port = process.env.PORT || 9000;
const app = express();

const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.gql',{encoding:'utf-8'})
const resolvers = require('./resolvers')

// Adding Type Definitions
const typeDefinition = `
   type Query  {
      greeting: String
   }`;
// Adding resolver
const  resolverObject = {
    Query : {
       greeting: () => 'Hello GraphQL  From TutorialsPoint !!'
    }
 };   

const {makeExecutableSchema} = require('graphql-tools')
const schema = makeExecutableSchema({typeDefs, resolvers})
//const schema = makeExecutableSchema({typeDefs: typeDefinition, resolvers: resolverObject});

//configure middleware
app.use(cors(), bodyParser.json());

const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express')
app.use('/graphql',graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))

app.listen(
   port, () => console.info(
      `Server started on port ${port}`
   )
);