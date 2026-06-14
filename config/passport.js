const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Usuario } = require('../model/modelos');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SESSION_SECRET
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const usuario = await Usuario.findByPk(payload.id);

      if (!usuario) {
        return done(null, false);
      }

      return done(null, usuario);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;