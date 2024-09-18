const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : {
        type : String,
        private : true
    },
    username : String,
    likedSongs : [
        {
            type : mongoose.Types.ObjectId,
            ref : "song"
        }
    ],
    subscribedArtist : [
        {
            type : mongoose.Types.ObjectId,
            ref : "user"
        }
    ],
})

module.exports = mongoose.model("user" , userSchema);