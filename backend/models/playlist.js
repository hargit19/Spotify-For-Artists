const mongoose = require('mongoose');

const playlistSchema = mongoose.Schema({
    name : String,
    thumbnail : String,
    owner : {
        type : mongoose.Types.ObjectId,
        ref : "user"
    },
    songs : [
        {
            type : mongoose.Types.ObjectId,
            ref : "song"
        }
    ]
})

module.exports = mongoose.model("playlist" , playlistSchema);