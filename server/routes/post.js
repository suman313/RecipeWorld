import express from "express";
import {
  getPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostBySearch,
} from "../controllers/post.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/search", getPostBySearch);
router.get("/", getPosts);
router.post("/", auth, createPost);
router.get("/:id", getOnePost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
