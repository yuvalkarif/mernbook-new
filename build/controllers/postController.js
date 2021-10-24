"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePost = exports.removePost = exports.removeComment = exports.readPostsByFollowed = exports.readPost = exports.likePost = exports.createPost = exports.createComment = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _post = _interopRequireDefault(require("../models/post"));

var _mongoose = require("mongoose");

var _addObjToArray = _interopRequireDefault(require("../helpers/addObjToArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createPost = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var {
      id,
      body,
      picture
    } = req.body;

    if (id && _mongoose.Types.ObjectId.isValid(id)) {
      var user;
      var newPost;

      try {
        user = yield _user.default.findOne({
          _id: id
        });
      } catch (err) {
        next(err);
      }

      if (user) {
        newPost = new _post.default({
          creator: user,
          body: body,
          picture
        });

        try {
          user.posts.push(newPost);
          yield newPost.save();
          yield user.save();
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
  });

  return function createPost(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.createPost = createPost;

var updatePost = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    var {
      id,
      postId,
      body,
      picture
    } = req.body;

    if (id && postId && _mongoose.Types.ObjectId.isValid(id) && _mongoose.Types.ObjectId.isValid(postId)) {
      var user;
      var post;

      try {
        user = yield _user.default.findOne({
          _id: id
        });
        post = yield _post.default.findOne({
          _id: postId
        }).populate("creator");
      } catch (err) {
        next(err);
      }

      if (user.id === post.creator.id && post && user) {
        post.body = body;
        post.picture = picture;

        try {
          yield post.save();
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
  });

  return function updatePost(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updatePost = updatePost;

var removePost = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    var {
      id,
      postId
    } = req.body;

    if (id && postId && _mongoose.Types.ObjectId.isValid(id) && _mongoose.Types.ObjectId.isValid(postId)) {
      var user;
      var post;

      try {
        var _User$findOne, _Post$findOne;

        user = yield (_User$findOne = _user.default.findOne({
          _id: id
        })) === null || _User$findOne === void 0 ? void 0 : _User$findOne.populate("posts");
        post = yield (_Post$findOne = _post.default.findOne({
          _id: postId
        })) === null || _Post$findOne === void 0 ? void 0 : _Post$findOne.populate("creator");
      } catch (err) {
        next(err);
      }

      if (user && post) {
        user.posts = user.posts.filter(post => post.id != postId);
        var newUser;

        try {
          yield user.save();
          yield _post.default.findByIdAndDelete(postId);
          newUser = yield _user.default.findOne({
            _id: id
          });
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
  });

  return function removePost(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.removePost = removePost;

var readPost = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res, next) {
    var {
      postId
    } = req.params;

    if (postId && _mongoose.Types.ObjectId.isValid(postId)) {
      var post;

      try {
        post = yield _post.default.findOne({
          _id: postId
        });
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
  });

  return function readPost(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.readPost = readPost;

var createComment = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res, next) {
    var {
      id,
      postId,
      body
    } = req.body;

    if (postId && id && _mongoose.Types.ObjectId.isValid(id) && _mongoose.Types.ObjectId.isValid(postId)) {
      var post;
      var user;

      try {
        user = yield _user.default.findOne({
          _id: id
        });
        post = yield _post.default.findOne({
          _id: postId
        });
      } catch (err) {
        next(err);
      }

      if (post) {
        var newComment = {
          body,
          creator: user.id
        };
        post.comments.push(newComment);
        post.save();
        res.send(post.comments);
      } else {
        res.status(404).send("Post not Found");
      }
    } else {
      res.status(404).send(id ? "No Valid PostID Detected" : "No Valid UserID Detected");
    }
  });

  return function createComment(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.createComment = createComment;

var removeComment = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res, next) {
    var {
      commentId,
      postId
    } = req.body;

    if (commentId && postId && _mongoose.Types.ObjectId.isValid(postId) && _mongoose.Types.ObjectId.isValid(commentId)) {
      var post;

      try {
        post = yield _post.default.findOne({
          _id: postId
        });
      } catch (error) {
        next(error);
      }

      post.comments = post.comments.filter(comment => comment.id !== commentId);

      try {
        yield post.save();
      } catch (error) {
        next(error);
      }

      res.send(post.comments);
    } else {
      res.status(404).send(postId ? "No Valid PostID Detected" : "No Valid Comment Detected");
    }
  });

  return function removeComment(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

exports.removeComment = removeComment;

var readPostsByFollowed = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res, next) {
    var {
      id
    } = req.params;

    if (id && _mongoose.Types.ObjectId.isValid(id)) {
      var user;
      var postIds = [];
      var posts;

      try {
        user = yield _user.default.findOne({
          _id: id
        }, "following").populate({
          path: "following",
          select: "posts"
        });
      } catch (error) {
        next(error);
      }

      if (user) {
        for (var followings of user.following) {
          postIds = postIds.concat(followings.posts);
        }

        try {
          posts = yield _post.default.find({
            _id: {
              $in: postIds
            }
          }).distinct("_id");
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
  });

  return function readPostsByFollowed(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

exports.readPostsByFollowed = readPostsByFollowed;

var likePost = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res, next) {
    var {
      id,
      postId
    } = req.body;

    if (id && postId && _mongoose.Types.ObjectId.isValid(id) && _mongoose.Types.ObjectId.isValid(postId)) {
      var user;
      var post;

      try {
        user = yield _user.default.findOne({
          _id: id
        });
        post = yield _post.default.findOne({
          _id: postId
        });
      } catch (error) {
        next(error);
      }

      if (user && post) {
        post.likes = (0, _addObjToArray.default)(post.likes, id);

        try {
          yield post.save();
        } catch (error) {
          next(error);
        }

        res.send(post.likes);
      } else {
        res.status(404).send(user ? "Post not Found" : "User not Found");
      }
    } else {
      res.status(404).send(id ? "No Valid Post Detected" : postId ? "No Valid UserID Detected" : "No Valid User and Post ID Detected");
    }
  });

  return function likePost(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();

exports.likePost = likePost;
//# sourceMappingURL=postController.js.map