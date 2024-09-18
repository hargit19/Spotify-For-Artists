const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(cors({
    origin: '',// Frontend URL in development
    methods: ["POST" , "GET"], 
    credentials: true,
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

app.listen(8080,()=> {
    console.log("port is running at 8080");
})
