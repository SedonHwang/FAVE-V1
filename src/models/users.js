import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Username is required"
  },
  email: {
    type: String,
    required: "Email is required"
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("User", UserSchema);
export default model;
