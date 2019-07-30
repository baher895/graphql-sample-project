const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const PORT = 4000;

const app = express();

app.use(bodyParser.json());

app.get("/health-check", (req, res, next) => {
  res.send("The Server is Up & Healthy");
});

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
      type RootQuery {
        events: [String!]!
      }

      type RootMutation {
        createEvent(name: String): String
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      events: () => {
        return ["Baher", "Romina", "Mona"];
      },
      createEvent: args => {
        const eventName = args.name;
        return eventName;
      }
    },
    graphiql: true
  })
);

app.listen(process.env.PORT || PORT || 3000, () => {
  console.log(
    `The Server is Up & Running on Port ${process.env.PORT || PORT || 3000}`
  );
});
