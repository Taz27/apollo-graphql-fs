const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const db = require('./db');

const port = process.env.PORT || 9000;
const app = express();

//loading type definitions from schema file
const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.gql',{encoding:'utf-8'})
//loading resolvers
const resolvers = require('./resolvers')

//binding schema and resolver
const {makeExecutableSchema} = require('graphql-tools')
const schema = makeExecutableSchema({typeDefs, resolvers})

//configure middleware
//enabling cross domain calls and form post
app.use(cors(), bodyParser.json());

//enabling routes
const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express')
app.use('/graphql',graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))

//root route
app.get("/", (req, res) => {
   res.set('Content-Type', 'text/html');
   res.write('<h2>Welcome to my GraphQL Server!</h2>');
   res.write(`<h3>You can send query requests to path <span style="color: blue;">/graphql</span></h3>`);
   res.write(`<h3>You can access <em>GraphiQL IDE</em> at path <span style="color: blue;">/graphiql</span></h3>`);
   res.end();
});

app.get("*", (req, res) => {
   res.status(404).send(`<h3>404 - Page Not Found!</h3>`);
});

//registering port
app.listen(
   port, () => console.info(
      `Server started on port ${port}`
   )
);