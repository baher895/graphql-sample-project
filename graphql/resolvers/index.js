const event = require("./event");
const auth = require("./auth");
const booking = require("./booking");

module.exports = {
  ...event,
  ...auth,
  ...booking
};
