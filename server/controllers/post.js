import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      posts: posts,
      crrentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.send({ message: error });
  }
};

export const getOnePost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const post = await PostMessage.findById(_id);
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
  }
};

export const getPostBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  console.log(searchQuery);
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json({ data: posts });
  } catch (error) {
    res.send({ message: error });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const createPostMessage = new PostMessage({
    ...post,
    creator: req.UserId,
    createdAt: new Date().toISOString(),
  });
  try {
    await createPostMessage.save();
    res.status(201).json(createPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    res.status(404).send("This is not a valid ID");
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    res.status(400).send("This is not a valid ID");
  await PostMessage.findByIdAndRemove(_id);
  res.send({ message: "Post Deleted Successfully...." });
};
export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!req.UserId) return res.status(404).send("Unauthenticated");
  if (!mongoose.Types.ObjectId.isValid(_id))
    res.status(400).send("This is not a valid ID");
  const post = await PostMessage.findById(_id);
  const index = post.likes.findIndex((id) => id === String(req.UserId));
  if (index == -1) {
    post.likes.push(req.UserId);
  } else {
    post.likes = post.likes.filter((id) => id != String(req.UserId));
  }
  const likeUpdatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.send(likeUpdatedPost);
};
