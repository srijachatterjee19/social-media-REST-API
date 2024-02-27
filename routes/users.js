const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/", (req,res) =>{
    res.send("hey, it's user route");
});

// update user
router.put("/:id", async (req,res)=>{
    // verify if user id matches and check if user is admin
    if (req.body.userId == req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            } catch (error) {
                return res.status(500).json(error);     
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.body.id, {
                $set: req.body, //set all inputs inside this body 
            });
            res.status(200).json("Account has been updated");
        } catch (error) {
            console.log(error);
        }
    }else{
        return res.status(403).json("You can only update your account!");
    }
});
// delete user
router.delete("/:id", async (req,res)=>{
    // verify if user id matches and check if user is admin
    if (req.body.userId == req.params.id || req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.body.id);
            res.status(200).json("Account has been deleted");
        } catch (error) {
            console.log(error);
        }
    }else{
        return res.status(403).json("You can only update your account!");
    }
});
// get a single user
router.get("/:id", async (req,res) =>{
    try {
        const user = await User.findById(req.params.id);
        // user._doc contains all the user properties
        // seperate properties except for password and updatedAt in others
        const { password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
});
// follow user
router.put("/:id/follow", async (req,res) =>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: {followers: req.body.userId }});
                await currentUser.updateOne({$push: {following: req.params.id }});
                res.send(200).json("following new user");
            }else{
               res.status(403).json("you are following this user");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(403).json("you can't follow yourself")
    }
})
// unfollow user

module.exports = router;