import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema({
  title_kr: {
    type: String,
    required: "Title_kr is required"
  },
  title_en: {
    type: String,
    required: "Title_en is required"
  },
  title_jp: {
    type: String,
    required: "Title_jp is required"
  },
  description_kr: {
    type: String,
    required: "description_kr is required"
  },
  description_en: {
    type: String,
    required: "description_en is required"
  },
  description_jp: {
    type: String,
    required: "description_jp is required"
  },
  notice_img: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("Notice", NoticeSchema);
export default model;
