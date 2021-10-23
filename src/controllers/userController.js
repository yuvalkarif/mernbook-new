import passport from "passport";
//Bcrypt
import bcrypt from "bcrypt";
const saltRounds = 10;
import { Types } from "mongoose";
import User from "../models/user";

export const signup = async (req, res, next) => {
  let user;
  let savedUser;
  try {
    user = await User.findOne({ username: req.body.username });
    if (!user) {
      const { username, displayname, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({
        username,
        displayname,
        password: hashedPassword,
      });

      savedUser = await newUser.save();
      res.send("User registered successfully");
    } else {
      res.status(405).send("User already exists");
    }
  } catch (error) {
    next(error);
  }
};

export const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) next(err);
    if (!user) {
      res.status(403).send("User doesn't exists");
    } else {
      req.logIn(user, (err) => {
        if (err) {
          next(err);
        }
        res.send("Successfully Authenticated");
      });
    }
  })(req, res, next);
};

export const currentUser = (req, res, next) => {
  req.user ? res.send(req.user) : res.status(401).send("User not logged in");
};

export const logout = (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send("logged out");
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  let user;
  if (id && Types.ObjectId.isValid(id)) {
    try {
      user = await User.findOne({ _id: id });
    } catch (err) {
      next(err);
    }
    if (user !== undefined) {
      res.send(user);
    } else res.status(404).send("User does not Exist");
  } else res.status(404).send("No ID");
};
export const getUserByUsername = async (req, res, next) => {
  const { username } = req.params;
  let user;
  if (username) {
    try {
      user = await User.findOne({ username: username });
    } catch (err) {
      next(err);
    }
    if (user !== undefined) {
      res.send(user);
    } else res.status(404).send("User does not Exist");
  } else res.status(404).send("No ID");
};

export const updateUser = async (req, res, next) => {
  const { id, picture, summary, work, education, birthday } = req.body;
  let user;
  if (id && Types.ObjectId.isValid(id)) {
    try {
      user = await User.findOne({ _id: id });
    } catch (err) {
      next(err);
    }
    if (user) {
      user.picture = picture;
      user.about = { summary, work, education, birthday };
      try {
        await user.save();
      } catch (error) {
        next(error);
      }
      res.send("User Updated Successfully");
    }
  } else res.status(404).send("No ID");
};

export const followUser = async (req, res, next) => {
  const { id, userId } = req.body;

  if (
    id &&
    Types.ObjectId.isValid(id) &&
    userId &&
    Types.ObjectId.isValid(userId)
  ) {
    let user;
    let userToFollow;
    try {
      user = await User.findOne({ _id: id });
      userToFollow = await User.findOne({ _id: userId });
    } catch (error) {
      next(error);
    }
    if (user && userToFollow) {
      userToFollow.followers.push(user);
      user.following.push(userToFollow);
      try {
        await user.save();
        await userToFollow.save();
      } catch (error) {
        next(error);
      }
      res.send(userToFollow.followers);
    } else {
      res.status(404).send("Users not Found");
    }
  } else {
    res
      .status(404)
      .send(id ? "No Valid ID Detected" : "No Valid UserID Detected");
  }
};

export const unfollowUser = async (req, res, next) => {
  const { id, userId } = req.body;

  if (
    id &&
    Types.ObjectId.isValid(id) &&
    userId &&
    Types.ObjectId.isValid(userId)
  ) {
    let user;
    let userToFollow;
    try {
      user = await User.findOne({ _id: id });
      userToFollow = await User.findOne({ _id: userId });
    } catch (error) {
      next(error);
    }
    if (user && userToFollow) {
      userToFollow.followers = userToFollow.followers.filter(
        (follower) => follower._id.toString() !== id
      );

      user.following = user.following.filter(
        (follower) => follower._id.toString() !== userId
      );
      try {
        await user.save();
        await userToFollow.save();
      } catch (error) {
        next(error);
      }
      res.send(userToFollow.followers);
    } else {
      res.status(404).send("Users not Found");
    }
  } else {
    res
      .status(404)
      .send(
        id
          ? "No Valid ID Detected"
          : userId
          ? "No Valid UserID Detected"
          : "No Valid User and  ID Detected"
      );
  }
};

export const searchUser = async (req, res, next) => {
  const { query } = req.params;
  if (query) {
    let users;
    try {
      users = await User.fuzzySearch(query);
    } catch (error) {
      next(error);
    }
    if (users) {
      res.send(users);
    } else res.status(404).send("No users found ");
  } else res.status(404).send("Please fill in a Query");
};

export const recommendUsers = async (req, res, next) => {
  const { following, _id } = req.user;

  if (following) {
    let users;
    try {
      users = await User.find({ _id: { $nin: [...following, _id] } })
        .sort({
          followers: -1,
        })
        .limit(10);
    } catch (error) {
      next(error);
    }
    if (users) {
      res.send(users);
    } else res.status(404).send("No on to follow Found");
  } else res.status(404).send("No user Found");
};
