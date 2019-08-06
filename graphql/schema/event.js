const types = `
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
      creator: User!
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }
  `;

const queries = `
    events: [Event!]!
  `;

const mutations = `
    createEvent(eventInput: EventInput): Event
  `;

module.exports = {
  types,
  queries,
  mutations
};
