const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const schema = require("./graphql/schema");
const rootValue = require("./graphql/resolvers");
const isAuth = require("./middleware/is-auth");

const PORT = 4000;

const app = express();

app.use(bodyParser.json());

app.get("/health-check", (req, res, next) => {
  res.send("The Server is Up & Healthy");
});

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema,
    rootValue,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-y9ecc.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    app.listen(process.env.PORT || PORT || 3000, () => {
      console.log(
        `The Server is Up & Running on Port ${process.env.PORT || PORT || 3000}`
      );
    });
  })
  .catch(err => {
    console.log(err);
  });
