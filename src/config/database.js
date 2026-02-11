const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://chandraveerDevGraph:Vvv1998@cluster0.wowksmd.mongodb.net/devTinder?appName=Cluster0")
}

module.exports = connectDB;