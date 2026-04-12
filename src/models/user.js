const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength : 3,
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
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email")
            }
        }
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

userSchema.methods.getJwt = async function () {
    const user = this
    const token = jwt.sign({_id:user._id},"Secret_key_dev",{expiresIn:"7d"})
    return token;
}

userSchema.methods.validPassword = async function (givenPassword) {
    const user = this
    const isPassword = await bcrypt.compare(givenPassword,user.password)
    return isPassword;
}

const User = mongoose.model("User", userSchema);
module.exports = User;