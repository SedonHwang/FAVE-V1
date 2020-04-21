import mongoose from "mongoose";

const PurchaselistSchema = new mongoose.Schema({
  recipientName: {
    type: String,
    required: "recipientName is required",
  },
  ordererName: {
    type: String,
    required: "ordererName is required",
  },
  recipientPhoneNum: {
    type: String,
    required: "recipientPhoneNumber is required",
  },
  ordererPhoneNum: {
    type: String,
    required: "ordererPhoneNum is required",
  },
  ordererEmail: {
    type: String,
    required: "ordererEmail is required",
  },
  country: {
    type: String,
    required: "country is required",
  },
  address: {
    type: String,
    required: "address is required",
  },
  postalCode: {
    type: String,
    required: "postal code is required",
  },
  productName: {
    type: String,
    required: "productName is required",
  },
  shipPrice: String,
  productPrice: String,
  totalPrice: String,
  pinkCnt: String,
  greenCnt: String,
  shipMessage: String,
  shipStatus: String,
  shipStatus_kr: String,
  shipStatus_jp: String,
  purchaseInfo: {
    type: String,
    required: "purchaseInfo is required",
  },
  imp_uid: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const model = mongoose.model("Purchaselist", PurchaselistSchema);
export default model;
