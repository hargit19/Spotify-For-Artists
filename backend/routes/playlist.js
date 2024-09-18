const express = require('express');
const router = express.Router();
const passport = require('passport');
const playlistModel = require('../models/playlist');
const songModel = require('../models/song');


router.post("/create" , passport.authenticate("jwt" , {session : false}) , async (req,res) => {
    let createdPlaylist = await playlistModel.create({
        name : req.body.name,
        thumbnail : req.body.thumbnail,
        songs : req.body.songs,
        owner : req.user._id
    })

    return res.status(200).json(createdPlaylist);

})


router.get("/get/me", passport.authenticate("jwt", { session: false }), async (req, res) => {
    
    let playlist = await playlistModel.find({ owner: req.user._id });

    // Check if the playlist array is empty
    if (!playlist || playlist.length === 0) {
        return res.status(404).json({ error: "playlist not found here" });
    }

    return res.status(200).json(playlist);
});


router.get("/get/:playlistId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    
    let playlist = await playlistModel.findOne({ _id: req.params.playlistId }).populate({
        path : "songs",
        populate : {
            path : "owner"
        }
    })


    // Check if the playlist array is empty
    if (!playlist || playlist.length === 0) {
        return res.status(404).json({ error: "playlist not found here" });
    }

    return res.status(200).json(playlist);
});


router.get("/get/artist/:artistId" , passport.authenticate("jwt" , {session : false}) , async (req,res) => {
    let playlist = await playlistModel.find({owner : req.params.artistId});

    if(!playlist){
        return res.status(301).json({error : "playlist not found"});
    }

    return res.status(200).json(playlist);
})

router.post("/add/song" , passport.authenticate("jwt" , {session : false}) , async (req,res) => {
    let playlist = await playlistModel.findOne({_id : req.body.playlistId});

    if(!playlist){
        return res.status(301).json({error : "playlist not found"});
    }

    
    let song = await songModel.findOne({_id : req.body.songId});
    if(!song){
        return res.status(301).json({error : "song not found"});
    }

    playlist.songs.push(song._id);
    await playlist.save();

    return res.status(200).json(playlist);

})

module.exports = router;