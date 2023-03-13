const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { ResponseUserModel } = require("../controllers/AuthController");
const db = require('../models');
const User = db.user;
const License = db.license;

const keys = require("./keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      UserModel.hasMany(LicenseModel);

      UserModel.findOne({
        where: { id: jwt_payload.id },
        include: [{ model: LicenseModel, as: "license" }]
      }).then(user => {
        if (user) {
      
          return done(null, ResponseUserModel(user));
        }
        return done(null, false);
      })
        .catch(err => console.log(err));
    })
  );
};