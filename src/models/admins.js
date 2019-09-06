import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Username is required"
  },
  email: {
    type: String,
    required: "Email is required"
  },
  password: {
    type: String,
    required: "Password is required"
  },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game"
    }
  ],
  notices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notice"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("Admin", AdminSchema);
export default model;
