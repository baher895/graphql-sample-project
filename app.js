const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const PORT = 4000;

const events = [];

const app = express();

app.use(bodyParser.json());

app.get("/health-check", (req, res, next) => {
  res.send("The Server is Up & Healthy");
});

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      input InputEvent {
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      type RootQuery {
        events: [Event!]!
      }

      type RootMutation {
        createEvent(inputEvent: InputEvent): Event
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: args => {
        const event = {
          _id: Math.random().toString(),
          title: args.inputEvent.title,
          description: args.inputEvent.description,
          price: +args.inputEvent.price,
          date: args.inputEvent.date
        }
        events.push(event);
        return event;
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
