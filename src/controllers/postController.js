import User from "../models/user";
import Post from "../models/post";
import { Types } from "mongoose";
import addObjToArray from "../helpers/addObjToArray";

export const createPost = async (req, res, next) => {
  const { id, body, picture } = req.body;
  if (id && Types.ObjectId.isValid(id)) {
    let user;
    let newPost;
    try {
      user = await User.findOne({ _id: id });
    } catch (err) {
      next(err);
    }
    if (user) {
      newPost = new Post({
        creator: user,
        body: body,
        picture,
      });
      try {
        user.posts.push(newPost);
        await newPost.save();
        await user.save();
        res.send(newPost.id);
      } catch (error) {
        next(error);
      }
    } else {
      res.status(404).send("User not Found");
    }
  } else {
    res.status(404).send("No Valid User Detected");
  }
};

export const updatePost = async (req, res, next) => {
  const { id, postId, body, picture } = req.body;
  if (
    id &&
    postId &&
    Types.ObjectId.isValid(id) &&
    Types.ObjectId.isValid(postId)
  ) {
    let user;
    let post;
    try {
      user = await User.findOne({ _id: id });
      post = await Post.findOne({ _id: postId }).populate("creator");
    } catch (err) {
      next(err);
    }

    if (user.id === post.creator.id && post && user) {
      post.body = body;
      post.picture = picture;
      try {
        await post.save();
      } catch (error) {
        next(error);
      }
      res.send("Post Updated Successfully");
    } else {
      res.send("You are not the creator of the post or it doesn't exists");
    }
  } else {
    res.send(id ? "No Valid Post Detected" : "No Valid User Detected");
  }
};

export const removePost = async (req, res, next) => {
  const { id, postId } = req.body;
  if (
    id &&
    postId &&
    Types.ObjectId.isValid(id) &&
    Types.ObjectId.isValid(postId)
  ) {
    let user;
    let post;
    try {
      user = await User.findOne({ _id: id })?.populate("posts");
      post = await Post.findOne({ _id: postId })?.populate("creator");
    } catch (err) {
      next(err);
    }
    if (user && post) {
      user.posts = user.posts.filter((post) => post.id != postId);
      let newUser;
      try {
        await user.save();
        await Post.findByIdAndDelete(postId);
        newUser = await User.findOne({ _id: id });
      } catch (error) {
        next(error);
      }

      res.send(postId);
    } else {
      res.send(post ? "No Valid User Found" : "No Valid Post Found");
    }
  } else {
    res.send(id ? "No Valid Post Detected" : "No Valid User Detected");
  }
};

export const readPost = async (req, res, next) => {
  const { postId } = req.params;
  if (postId && Types.ObjectId.isValid(postId)) {
    let post;
    try {
      post = await Post.findOne({ _id: postId });
    } catch (err) {
      next(err);
    }
    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Post not Found");
    }
  } else {
    res.send("No Valid Post ID");
  }
};

export const createComment = async (req, res, next) => {
  const { id, postId, body } = req.body;
  if (
    postId &&
    id &&
    Types.ObjectId.isValid(id) &&
    Types.ObjectId.isValid(postId)
  ) {
    let post;
    let user;
    try {
      user = await User.findOne({ _id: id });
      post = await Post.findOne({ _id: postId });
    } catch (err) {
      next(err);
    }
    if (post) {
      const newComment = { body, creator: user.id };
      post.comments.push(newComment);
      post.save();
      res.send(post.comments);
    } else {
      res.status(404).send("Post not Found");
    }
  } else {
    res
      .status(404)
      .send(id ? "No Valid PostID Detected" : "No Valid UserID Detected");
  }
};

export const removeComment = async (req, res, next) => {
  const { commentId, postId } = req.body;
  if (
    commentId &&
    postId &&
    Types.ObjectId.isValid(postId) &&
    Types.ObjectId.isValid(commentId)
  ) {
    let post;
    try {
      post = await Post.findOne({ _id: postId });
    } catch (error) {
      next(error);
    }
    post.comments = post.comments.filter((comment) => comment.id !== commentId);
    try {
      await post.save();
    } catch (error) {
      next(error);
    }
    res.send(post.comments);
  } else {
    res
      .status(404)
      .send(postId ? "No Valid PostID Detected" : "No Valid Comment Detected");
  }
};

export const readPostsByFollowed = async (req, res, next) => {
  const { id } = req.params;
  if (id && Types.ObjectId.isValid(id)) {
    let user;
    let postIds = [];
    let posts;
    try {
      user = await User.findOne({ _id: id }, "following").populate({
        path: "following",
        select: "posts",
      });
    } catch (error) {
      next(error);
    }
    if (user) {
      for (const followings of user.following) {
        postIds = postIds.concat(followings.posts);
      }
      try {
        posts = await Post.find({ _id: { $in: postIds } }).distinct("_id");
      } catch (error) {
        next(error);
      }
      res.send(posts);
    } else {
      res.status(404).send("User not Found");
    }
  } else {
    res.status(404).send("No ID");
  }
};

export const likePost = async (req, res, next) => {
  const { id, postId } = req.body;
  if (
    id &&
    postId &&
    Types.ObjectId.isValid(id) &&
    Types.ObjectId.isValid(postId)
  ) {
    let user;
    let post;
    try {
      user = await User.findOne({ _id: id });
      post = await Post.findOne({ _id: postId });
    } catch (error) {
      next(error);
    }
    if (user && post) {
      post.likes = addObjToArray(post.likes, id);
      try {
        await post.save();
      } catch (error) {
        next(error);
      }
      res.send(post.likes);
    } else {
      res.status(404).send(user ? "Post not Found" : "User not Found");
    }
  } else {
    res
      .status(404)
      .send(
        id
          ? "No Valid Post Detected"
          : postId
          ? "No Valid UserID Detected"
          : "No Valid User and Post ID Detected"
      );
  }
};
