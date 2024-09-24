const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await db.User.findOne({ where: { username } });
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};