const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

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
router .put("/:id/like",async (req,res) =>{
    try {   
        const post = await Post.findById(req.params.id);
        // if post not liked, like it
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes: req.body.userId}});
            res.send(200).json("Post liked by you")
        }else{
            // if post is marked liked, dislike it
            await post.updateOne({$pull:{likes: req.body.userId}});
            res.send(200).json("Post disliked liked by you")
        }
    } catch (error) {
        res.status(500).json(error);
    }
});
//get post
router.get("/:id", async (req,res) =>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})
//get timeline posts
router.get("/timeline/all", async (req,res) =>{
    try {
        const currentUser = await User.findById(req.body.userId);
        // add all posts of current user to array
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendsPosts = await Promise.all(
            // map over people followed by current user and add all their posts
            currentUser.following.map((friendId) => {
                return Post.find({userId: friendId});
            })
        );
        //combine all your posts and your followers too
        res.json(userPosts.concat(...friendsPosts));
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;
