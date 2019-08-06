const types = `
    type Booking {
      _id: ID!
      event: Event!
      user: User!
      createdAt: String
      updatedAt: String
    }
  `;

const queries = `
    bookings: [Booking!]!
  `;

const mutations = `
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
  `;

module.exports = {
  types,
  queries,
  mutations
};
