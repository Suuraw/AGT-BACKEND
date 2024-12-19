import { Post } from "../models/post.js";

// creating a new post
export const createPost = async (req, res) => {
  try {
    const { postType, postHead, postPara, username } = req.body;
    if (!postType || !postHead || !postPara || !username) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newPost = new Post({ postType, postHead, postPara, username });
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: "Error creating post", details: err.message });
  }
};
// gETting all the post
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving posts", details: err.message });
  }
};

// get a specific post
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving post", details: err.message });
  }
};

// edit a post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { postType, postHead, postPara, username } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { postType, postHead, postPara, username },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Error updating post", details: err.message });
  }
};

//  deleting a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", post: deletedPost });
  } catch (err) {
    res.status(500).json({ error: "Error deleting post", details: err.message });
  }
};
