const express = require('express');
const router = express.Router();
const songModel = require('../models/song');
const userModel = require('../models/user');
const passport = require('passport');



// router.post("/create" , passport.authenticate("jwt" , {session : false}) , async (req,res) => {

// if(!req.body.songName || !req.body.thumbnail || !req.body.track){
// return res.status(301).json({error : "insufficient details for a song"});
// }

// let createdSong = await songModel.create({
//     songName : req.body.songName,
//     thumbnail : req.body.thumbnail,
//     track : req.body.track,
//     owner : req.user._id
// })

// return res.status(200).json(createdSong);

// })


router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
      // Check if all required details are provided
      if (!req.body.songName || !req.body.thumbnail || !req.body.track) {
        return res.status(400).json({ error: "Insufficient details for a song" });
      }

      // Create the song in the database
      let createdSong = await songModel.create({
        songName: req.body.songName,
        thumbnail: req.body.thumbnail,
        track: req.body.track,
        owner: req.user._id
      });
  
      // Send back the created song as a response
      return res.status(200).json(createdSong);
      
    } catch (err) {
      console.error("Error creating song:", err);
  
      // Handle unauthorized error
      if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: "Unauthorized object received" });
      }
  
      // Handle validation error or other errors
      return res.status(500).json({ error: "An error occurred while creating the song" });
    }
  });
  

router.get("/get/mysongs" , passport.authenticate("jwt" , {session : false}) , async (req,res) => {

let songs = await songModel.find({owner : req.user._id}).populate("owner");
return res.status(200).json({data : songs});

})


router.get("/get/artist/:artistId" , passport.authenticate("jwt", {session : false}) , async (req,res) => {
    let artistId = req.params.artistId;

    const artist = await userModel.find({_id : artistId});
    if(!artist){
        return res.status(301).json({error : "artist not found"});
    }

    let songs = await songModel.find({owner : artistId});
    return res.status(200).json({data : songs});
})


router.get(
    "/get/songname/:typedname",
    passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        let name = req.params.typedname;

        // name:songName --> exact name matching. Vanilla, Vanila
        // Pattern matching instead of direct name matching.
        const songs = await songModel.find({songName : name}).populate("owner");

        return res.status(200).json({data: songs});
    }
);

router.post("/add/likedsong" , passport.authenticate("jwt" , {session : false}) , async (req,res) => {
  let current_user = await userModel.findOne({_id : req.user._id});

  let songId = req.body.songId;

  current_user.likedSongs.push(songId);
  await current_user.save();

  return res.status(200).json(current_user);
  
})

router.get("/view/likedsong" , passport.authenticate("jwt" , {session : false}) , async (req,res) => {
  let current_user = await userModel.findOne({_id : req.user._id}).populate({
    path : "likedSongs",
    populate : {
      path : "owner"
    }
  });

  return res.status(200).json(current_user);
  
})

router.get("/getcredentials", 
  passport.authenticate("jwt", { session: false }), 
  (req, res) => {
    let loggedinUser = req.user;
    console.log(loggedinUser);
    res.json(loggedinUser); // Send the user details as a response
  }
);

module.exports = router;