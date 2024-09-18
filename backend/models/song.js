const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    songName : String,
    thumbnail : String,
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    track : String
})

module.exports = mongoose.model("song" , songSchema);