const User = require('../models/user');
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {

    console.log('req.body', req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

exports.signin = (req, res) => {

    // find user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User with this email does not exist, Pleas signup"
            });
        }
        // if user found make sure the email and password match
        // create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password don't matched"
            });
        }

        // generate a signed token with userid and secret 
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        // persit the token as "lt" in cookie with expiry date
        res.cookie('tl', token, { expire: new Date() + 9999 });

        // return reponse with user and token to fronend client 

        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } });

    });
};

exports.signout = (req, res) => {

    res.clearCookie('tl');
    res.json({ message: "Signout Success" })
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;

    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin resourse! Access denied"
        });
    }
    next();
};