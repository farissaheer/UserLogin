import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  phone: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "userprofile.webp",
  },
  isAdmin: {
    type: Number,
    required: true,
    default: 0,
  },
});

const userDetails = new mongoose.model("userDetails", userSchema);
export default userDetails;
