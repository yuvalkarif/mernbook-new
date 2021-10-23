import mongoose from "mongoose";
const { Schema, model } = mongoose;
import mongooseFuzzySearching from "mongoose-fuzzy-searching";

const userSchema = new Schema({
  username: { type: String, required: true },
  displayname: { type: String, required: true },
  password: { type: String, required: true },
  following: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
  ],
  picture: { type: String, default: "https://i.imgur.com/von5DZb.jpg" },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  about: {
    summary: { type: String },
    work: { type: String },
    education: { type: String },
    birthday: { type: Date },
  },
});

userSchema.plugin(mongooseFuzzySearching, {
  fields: ["username", "displayname"],
});

const User = model("User", userSchema);
export default User;
