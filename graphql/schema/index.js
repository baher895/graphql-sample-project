const { buildSchema } = require("graphql");

const event = require("./event");
const auth = require("./auth");
const booking = require('./booking');

module.exports = buildSchema(`
      ${event.types}

      ${auth.types}

      ${booking.types}

      type RootQuery {
        ${event.queries}

        ${auth.queries}

        ${booking.queries}
      }

      type RootMutation {
        ${event.mutations}

        ${auth.mutations}

        ${booking.mutations}
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `);
