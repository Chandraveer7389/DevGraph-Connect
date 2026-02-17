const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(URI)
}

module.exports = connectDB;