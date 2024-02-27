const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        min:3, 
        max: 20,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        required: true,
        min: 6,
    },
    profilePicture:{
        type:String,
        default: "",
    },
    coverPicture:{
        type:String,
        default: "",
    },
    followers:{
        type:Array,
        default: [],
    },
    following:{
        type:Array,
        default: [],
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
},
{timestamps: true} //update timestamps automatically when user is created or changes are made
);

module.exports = mongoose.model("User", UserSchema);