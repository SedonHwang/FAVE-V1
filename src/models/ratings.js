import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
  fave350TotalRating: {
    type: Number,
    default: 0,
  },
  fave350TotalCount: {
    type: Number,
    default: 0,
  },
  fave450TotalRating: {
    type: Number,
    default: 0,
  },
  fave450TotalCount: {
    type: Number,
    default: 0,
  },
  headerImg: [],
});

const model = mongoose.model("Rating", RatingSchema);
export default model;
