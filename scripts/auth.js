const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const User = require('../db/userModel');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const opts = {
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('auth_token'),
    secretOrKey: process.env.JWT_SECRET,
    issuer: 'api-asgn2.farsos.ca',
    audience: 'api-asgn2.farsos.ca'
};


passport.use('jwt',new JwtStrategy(opts,
    (jwt_payload, done) => {
    User.findOne({id: jwt_payload.sub}).exec((err, user) => {
        if(err){
            return done(err)
        }else{
            if (user) {
                return done(null, jwt_payload.sub);
            } else {
                return done(null, false);
            }
        }
    });
}));

passport.use('local',new LocalStrategy({
    usernameField: "username",//todo change to frontend form
    passwordField: "password",//todo change to frontend form
    session: false
}, (email, password, done) => {
    User.findOne({email: email}).exec((err, user) => {
        if(err){
            return done(err)
        }
        else{
            if (!user) {
                return done(null, false, {message: "user not found"});
            }
            if (bcrypt.compareSync(password, user.password_bcrypt)) {
                return done(null, user);
            } else {
                return done(null, false, {message: "Incorrect Password"})
            }
        }
    });

}));

const checkAuthenticated = (req,res,next)=>{
    passport.authenticate('jwt', {session: false}, (err, user, info)=>{
        if (err) { return next(err); }
        if(info){
            res.status(401);
            res.json({msg:'None shall pass'});
        }

        if (!user) {
            res.status(403);
            res.send('Forbidden');
        }

        req.user = user;
        next();
    })(req, res, next);
};



const loginHandler = (req, resp)=>{
    passport.authenticate("local", {session: false}, (err, user)=>{
        if(err||!user){
            resp.status(401);
            resp.json({msg:'Incorrect email or password'});
        }else {
            const expiryDate = moment().add(1,'days');
            const payload = {
                sub: user.id,
                exp: expiryDate.unix()
            };
            const options = {algorithm: "HS256",audience: opts.audience, issuer: opts.issuer};
            const token = jwt.sign(payload, opts.secretOrKey, options);
            resp.json({token: token})
        }
    })(req, resp);
};

const setupPassport = (app) => {
    app.use(passport.initialize({userProperty: "user"}));
    app.route('/api/login').post(loginHandler);
};

module.exports = {
    setupPassport,
    checkAuthenticated
};
