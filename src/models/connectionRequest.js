const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },
    status: {
        type: String, 
        required: true,
        enum: {
            values: ["ignored", "accepted", "rejected", "interested"],
            message: `{VALUE} is incorrect status`
        }
    }
}, { timestamps: true }); 
connectionRequestSchema.pre('save', function() {
  const connectionRequest = this
  if(connectionRequest.toUserId.equals(connectionRequest.fromUserId)){
    throw new Error("Can't send request to yourself");
  }
}
);
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;