const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER 
router.post("/register", async (req,res) =>{
    
    try {
        // generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        
        //create new user
        const newUser = await new User({
            username: req.body.username,
            email:req.body.email,
            password:hashedPassword
        })

        // save user and return response
        const user = await newUser.save();
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json(error);
    }
});

// LOGIN
router.post("/login", async(req,res) =>{
    try {
        const user = await User.findOne({ email: req.body.email });
        // check if username is valid
        !user && res.status(404).send("user not found");
         // check if password is valid
         const validPassword = await bcrypt.compare(req.body.password, user.password);
         !validPassword && res.send(400).json("wrong password");
         // if username and password are both valid
         res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;