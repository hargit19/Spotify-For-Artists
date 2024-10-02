const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

// const allowedOrigins = ['https://spotify-for-artists-frontend.vercel.app'];

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.options('*', cors()); // Allows all preflight requests

// app.use(cors({
//   origin: function (origin, callback) {
//     // allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true, // If you are handling cookies or authentication
// }));

const allowedOrigins = ['https://spotify-for-artists-frontend.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // This allows credentials like cookies or headers to be sent with the request
}));


const User = require('./models/user');

const authRoute = require('./routes/auth');
const songRoute = require('./routes/song');
const playlistRoute = require('./routes/playlist');

mongoose.connect("mongodb+srv://hardikadvani1910:" + process.env.MONGODB_PASS + "@cluster0.whtnssh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=> {
    console.log("connected to db")
}).catch( (err) => {
    console.log("could not connect to db");
})

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
        const user = await User.findOne({email: jwt_payload.email});
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

app.get("/" , (req,res) => {
    res.send("hello babe");
})

app.use("/auth" , authRoute);
app.use("/song", songRoute);
app.use("/playlist" , playlistRoute);

app.listen(3000 , ()=> {
    console.log("port is running on port 3000");
})

module.exports = app; 
