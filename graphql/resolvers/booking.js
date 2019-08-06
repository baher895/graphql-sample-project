const Booking = require("../../models/booking");
const Event = require("../../models/event");

const { transformedEvent, transformedBooking } = require("./helpers");

module.exports = {
  bookings: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }

      const bookings = await Booking.find();
      return bookings.map(booking => {
        return transformedBooking(booking);
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  bookEvent: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }

      const event = await Event.findById(args.eventId);
      if (!event) {
        throw new Error("Event does not exist!");
      }

      // har 2 model neshoon dade shode
      const booking = new Booking({
        user: req.userId,
        event
      });

      const result = await booking.save();
      return transformedBooking(result);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  cancelBooking: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }
      // add a check user can only cancel his own booking

      const booking = await Booking.findById(args.bookingId).populate("event");
      if (!booking) {
        throw new Error("Booking not found");
      }

      await Booking.deleteOne({ _id: args.bookingId });
      return transformedEvent(booking.event);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
