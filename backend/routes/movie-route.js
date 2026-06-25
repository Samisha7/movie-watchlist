const express = require("express");
const router = express.Router();
const Movie=require(../models/movie-model);

//get all movies

router.get('/',async (req,res) => {
    try{
        const movies=await Movie.find();
        res.json(movies);
    }
    catch(err){
       res.status(500).json({message: err.message});
    }
});

router.post('/',async (req,res)=>{
    
        const movie= new Movie({
            title:req.body.title,
            genre:req.body.genre,
            year:req.bidy.year
        });
    try {
          const newMovie = await movie.save();
    res.status(201).json(newMovie);
    }
    catch (err) {
    res.status(400).json({ message: err.message });
  }
});

