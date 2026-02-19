const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength : 4,
    },
    lastName : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique: true,
        lowercase : true,
        trim : true,
    },
    password : {
        type : String,
        required : true,
    },
    age : {
        type : Number,
        min : 17,
    },
    gender : {
        type : String,
        validate(value) {
            if(!["Male","Female","Others"].includes(value)) {
                throw new Error("Invalid gender")
            }
        }
    },
    skills : {
        type : [String],
        default: []
    }

},{
    timestamps : true
})

const User = mongoose.model("User", userSchema);
module.exports = User;