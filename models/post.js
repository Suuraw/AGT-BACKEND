import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postType: {
      type: String,
      required: true,
      trim: true,
    },
    postHead: {
      type: String,
      required: true,
      trim: true,
    },
    postPara: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
