const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.localStrategy = new LocalStrategy(
  { usernameField: "username", passwordField: "password" },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done({ massage: "username or password is wrong" });
      }

      const checkPass = await bcrypt.compare(password, user.password);
      if (!checkPass) {
        return done({ massage: "username or password is wrong" });
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
