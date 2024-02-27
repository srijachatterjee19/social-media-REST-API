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
// follow user
// unfollow user

module.exports = router;