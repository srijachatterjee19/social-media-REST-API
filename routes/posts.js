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
router.put("/", async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        //if post belongs to current user 
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body}); //update post schema
            res.status(200).json("post has been updated");
        }else{
            res.status(403).json("you can only update your post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});
//delete post
router.delete("/", async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        //if post belongs to current user 
        if(post.userId === req.body.userId){
            await post.deleteOne(); //update post schema
            res.status(200).json("post has been deleted");
        }else{
            res.status(403).json("you can only update your post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});
//like post
//get post
//get timeline posts

module.exports = router;
