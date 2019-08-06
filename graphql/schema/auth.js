const types = `
    type User {
      _id: ID!
      email: String!
      password: String
      createdEvents: [Event!]
    }

    type AuthData {
      userId: ID!
      token: String!
      tokenExpiration: Int!
    }

    input UserInput {
      email: String!
      password: String!
    }
  `;

const queries = `
    login(email: String!, password: String!): AuthData
  `;

const mutations = `
    createUser(userInput: UserInput): User
  `;

module.exports = {
  types,
  queries,
  mutations
};
