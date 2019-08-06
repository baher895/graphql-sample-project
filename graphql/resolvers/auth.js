const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const { transformedUser } = require("./helpers");

module.exports = {
  createUser: async args => {
    try {
      const isUserExists = await User.findOne({ email: args.userInput.email });
      if (isUserExists) {
        throw new Error("User already exists!");
      }
      const hashedPassword = bcrypt.hashSync(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const savedUser = await user.save();

      return transformedUser(savedUser);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Credential");
    }

    const isEqual = await bcrypt.compareSync(password, user.password);
    if (!isEqual) {
      throw new Error("Invalid Credential");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return {
      userId: user.id,
      token,
      tokenExpiration: 1
    };
  }
};
