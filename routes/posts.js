const router = require("express").Router();
const Post = require("../models/Post");

//create post
router.post("/", async (req,res) =>{
    const newPost =  new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});
//update post
//delete post
//like post
//get post
//get timeline posts

module.exports = router;
