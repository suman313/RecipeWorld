import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  creator: String,
  name: String,
  title: String,
  message: String,
  tags: {
    type: [String],
    default: [],
  },
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", PostSchema);
export default PostMessage;
