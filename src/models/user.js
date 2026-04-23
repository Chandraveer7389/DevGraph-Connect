const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 17,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["Male", "Female", "Others"].includes(value)) {
          throw new Error("Invalid gender");
        }
      },
    },
    skills: {
      type: [String],
      default: [],
    },
    photoUrl: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20250512/ourmid/pngtree-default-avatar-profile-icon-gray-placeholder-vector-png-image_16213764.png",
      validate(value) {
        // Check if it's a standard URL OR if it starts with "data:image"
        const isBase64 = value.startsWith("data:image");
        const isStandardURL = validator.isURL(value);

        if (!isBase64 && !isStandardURL) {
          throw new Error(
            "Invalid Photo: Must be a valid URL or a Base64 image string.",
          );
        }
      },
    },
    about: {
      type: String,
      default: "This is a default bio of the user!",
      maxLength: 250,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJwt = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "Secret_key_dev", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validPassword = async function (givenPassword) {
  const user = this;
  const isPassword = await bcrypt.compare(givenPassword, user.password);
  return isPassword;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
