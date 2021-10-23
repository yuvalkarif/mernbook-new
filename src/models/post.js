import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postSchema = new Schema({
  creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  body: { type: String, required: true },
  likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  comments: [
    {
      body: { type: String, required: true },
      creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  date: { type: Date, default: Date.now },
  picture: { type: String },
});

const Post = model("Post", postSchema);
export default Post;
