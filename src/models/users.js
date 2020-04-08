import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required",
  },
  email: {
    type: String,
    required: "Email is required",
  },
  birthDate: String,
  sex: {
    type: String,
    enum: ["M", "F", "N"],
  },
  country: String,
  address1: String,
  address2: String,
  postalCode: String,
  height: Number,
  weight: Number,
  job: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  purchaselists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Purchaselist",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);
export default model;
