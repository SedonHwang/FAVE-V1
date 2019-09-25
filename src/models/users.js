import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Username is required"
  },
  email: {
    type: String,
    required: "Email is required"
  },
  receiveEmail: {
    type: Boolean,
    default: true
  },
  birthDate: Number,
  sex: {
    type: String,
    enum: ["M", "F", "N"]
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
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);
export default model;
