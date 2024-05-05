// const passport = require('passport')
// const JwtStrategy = require('passport-jwt').Strategy
// const {ExtractJwt} = require('passport-jwt')
// const {JWT_SECRET, auth} = require('../config/authenciation')
// const LocalStrategy =require('passport-local').Strategy
// const GooglePlusTokenStrategy = require('passport-google-plus-token')
// //passport jwt
// const User = require('../app/models/User')

// passport.use(new JwtStrategy({
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
//     secretOrKey:JWT_SECRET
// }, async (payload, done) => {
//     try {
//         const user = await User.findById(payload.sub)

//         if(!user) return done(null, false)

//         done(null, user)
//     } catch (error) {
//         done(error, false)
//     }
// }))

// //passport google
// passport.use(new GooglePlusTokenStrategy({
//     clientID: auth.google.CLIENT_ID,
//     clientSecret: auth.google.CLIENT_SECRET
// }, async (accessToken, refreshToken, profile, done) => {
//     try {

//         //check whether this current user exists in our database
//         const user = await User.findOne({authGoogleID: profile.id, authType: 'google'})
//         console.log('profile in4',profile)
//         if(user) return done(null, user)

//         //if new account
//         const newUser = new User({
//             authType: 'google',
//             authGoogleID: profile.id,
//             email: profile.emails[0].value,
//             name: profile.displayName
//         })

//         await newUser.save()

//         done(null, newUser)
//     } catch (error) {
//         done(error, false)
//     }
// }))


// //passport local
// passport.use(new LocalStrategy({
//     usernameField: 'email'
// }, async (email, password, done) => {
//     try {
//         const user = await User.findOne({email})

//         if(!user) return done(null, false)
    
//         const isCorrectPassword = await user.isValidPassword(password)
    
//         if(!isCorrectPassword) return done(null, false)
    
//         done(null, user)        
//     } catch (error) {
//         done(error, false)
//     }

// }))

const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Update this line

const { JWT_SECRET, auth } = require('../config/authenciation');
const User = require('../app/models/User');

// Passport jwt
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: JWT_SECRET,
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);

        if (!user) return done(null, false);

        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

// Passport google
passport.use(new GoogleStrategy({
    clientID: auth.google.CLIENT_ID,
    clientSecret: auth.google.CLIENT_SECRET,
    callbackURL: 'https://thegirls.id.vn/signin/auth/google', // Replace with your actual callback URL
    scope: ['profile', 'email'], // Đây là phạm vi bạn muốn truy cập
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check whether this current user exists in our database
        const user = await User.findOne({ authGoogleID: profile.id, authType: 'google' });
        console.log('profile in4', profile);

        if (user) return done(null, user);

        // If new account
        const newUser = new User({
            authType: 'google',
            authGoogleID: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
        });

        await newUser.save();

        done(null, newUser);
    } catch (error) {
        done(error, false);
    }
}));

// Passport local
passport.use(new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user) return done(null, false);

        const isCorrectPassword = await user.isValidPassword(password);

        if (!isCorrectPassword) return done(null, false);

        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));
