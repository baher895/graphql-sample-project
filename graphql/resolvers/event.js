const Event = require("../../models/event");
const User = require("../../models/user");

const { transformedEvent } = require("./helpers");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return transformedEvent(event);
      });

    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  createEvent: async (args, req) => {
    try {
      if(!req.isAuth){
        throw new Error('Unauthenticated!'); 
      }

      // bezar to transaction
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: req.userId
      });

      const savedEvent = await event.save();
      
      const creator = await User.findById(req.userId);
      if (!creator) {
        throw new Error("User does not exists!");
      }
      creator.createdEvents.push(event);
      await creator.save();

      return transformedEvent(savedEvent);

    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
