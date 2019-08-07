import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name_kr is required"
  },
  name_en: {
    type: String,
    required: "Name_en is required"
  },
  name_jp: {
    type: String,
    required: "Name_jp is required"
  },
  description: {
    type: String,
    required: "Description_kr is required"
  },
  description_en: {
    type: String,
    required: "Description_en is required"
  },
  description_jp: {
    type: String,
    required: "Description_jp is required"
  },
  tabletImg: {
    type: String,
    required: "Tablet Image is required"
  },
  mobileImg: {
    type: String,
    required: "Mobile Image is required"
  },
  androidLink: String,
  iosLink: String
});

const model = mongoose.model("Game", GameSchema);
export default model;
