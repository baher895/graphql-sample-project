const User = require("../../models/user");
const Event = require("../../models/event");

const { dateToString } = require("../../helpers/date");

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => {
      return transformedEvent(event);
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      password: null,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return transformedEvent(event);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const transformedEvent = async event => {
  return {
    ...event._doc,
    _id: event.id,
    creator: user.bind(this, event._doc.creator),
    date: dateToString(event._doc.date)
  };
};

const transformedUser = async () => {
  return {
    ...savedUser._doc,
    _id: savedUser.id,
    password: null
  };
};

const transformedBooking = async booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};

module.exports = {
  transformedBooking,
  transformedEvent,
  transformedUser
};
