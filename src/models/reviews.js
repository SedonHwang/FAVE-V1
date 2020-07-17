import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "title is required",
  },
  comment: {
    type: String,
    required: "comment is required",
  },
  rating: {
    type: Number,
    required: "star rating is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  language: {
    type: String,
    required: "language is required",
    enum: ["kr", "jp", "en"],
  },
  product: {
    type: String,
    required: "product is required",
    enum: ["fave350", "fave450"],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  imgLinks: String,
});

const model = mongoose.model("Review", ReviewSchema);
export default model;
