"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.unfollowUser = exports.signup = exports.searchUser = exports.recommendUsers = exports.logout = exports.login = exports.getUserByUsername = exports.getUser = exports.followUser = exports.currentUser = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _mongoose = require("mongoose");

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var saltRounds = 10;

var signup = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var user;
    var savedUser;

    try {
      user = yield _user.default.findOne({
        username: req.body.username
      });

      if (!user) {
        var {
          username,
          displayname,
          password
        } = req.body;
        var hashedPassword = yield _bcrypt.default.hash(password, saltRounds);
        var newUser = new _user.default({
          username,
          displayname,
          password: hashedPassword
        });
        savedUser = yield newUser.save();
        res.send("User registered successfully");
      } else {
        res.status(405).send("User already exists");
      }
    } catch (error) {
      next(error);
    }
  });

  return function signup(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); // export const login = (req, res, next) => {
//   if (req.user) {
//     res.send("Successfully Authenticated");
//   } else {
//     res.status(403).send("User doesn't exists");
//   }
// };


exports.signup = signup;

var login = (req, res, next) => {
  _passport.default.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(403).send("User doesn't exists");
    } else {
      req.login(user, err => {
        if (err) {
          return next(err);
        }

        return res.send("Successfully Authenticated");
      });
    }
  })(req, res, next);
};

exports.login = login;

var currentUser = (req, res, next) => {
  req.user ? res.send(req.user) : res.status(401).send("User not logged in");
};

exports.currentUser = currentUser;

var logout = (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send("logged out");
};

exports.logout = logout;

var getUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    var {
      id
    } = req.params;
    var user;

    if (id && _mongoose.Types.ObjectId.isValid(id)) {
      try {
        user = yield _user.default.findOne({
          _id: id
        });
      } catch (err) {
        next(err);
      }

      if (user !== undefined) {
        res.send(user);
      } else res.status(404).send("User does not Exist");
    } else res.status(404).send("No ID");
  });

  return function getUser(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUser = getUser;

var getUserByUsername = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    var {
      username
    } = req.params;
    var user;

    if (username) {
      try {
        user = yield _user.default.findOne({
          username: username
        });
      } catch (err) {
        next(err);
      }

      if (user !== undefined) {
        res.send(user);
      } else res.status(404).send("User does not Exist");
    } else res.status(404).send("No ID");
  });

  return function getUserByUsername(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUserByUsername = getUserByUsername;

var updateUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res, next) {
    var {
      id,
      picture,
      summary,
      work,
      education,
      birthday
    } = req.body;
    var user;

    if (id && _mongoose.Types.ObjectId.isValid(id)) {
      try {
        user = yield _user.default.findOne({
          _id: id
        });
      } catch (err) {
        next(err);
      }

      if (user) {
        user.picture = picture;
        user.about = {
          summary,
          work,
          education,
          birthday
        };

        try {
          yield user.save();
        } catch (error) {
          next(error);
        }

        res.send("User Updated Successfully");
      }
    } else res.status(404).send("No ID");
  });

  return function updateUser(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateUser = updateUser;

var followUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res, next) {
    var {
      id,
      userId
    } = req.body;

    if (id && _mongoose.Types.ObjectId.isValid(id) && userId && _mongoose.Types.ObjectId.isValid(userId)) {
      var user;
      var userToFollow;

      try {
        user = yield _user.default.findOne({
          _id: id
        });
        userToFollow = yield _user.default.findOne({
          _id: userId
        });
      } catch (error) {
        next(error);
      }

      if (user && userToFollow) {
        userToFollow.followers.push(user);
        user.following.push(userToFollow);

        try {
          yield user.save();
          yield userToFollow.save();
        } catch (error) {
          next(error);
        }

        res.send(userToFollow.followers);
      } else {
        res.status(404).send("Users not Found");
      }
    } else {
      res.status(404).send(id ? "No Valid ID Detected" : "No Valid UserID Detected");
    }
  });

  return function followUser(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.followUser = followUser;

var unfollowUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res, next) {
    var {
      id,
      userId
    } = req.body;

    if (id && _mongoose.Types.ObjectId.isValid(id) && userId && _mongoose.Types.ObjectId.isValid(userId)) {
      var user;
      var userToFollow;

      try {
        user = yield _user.default.findOne({
          _id: id
        });
        userToFollow = yield _user.default.findOne({
          _id: userId
        });
      } catch (error) {
        next(error);
      }

      if (user && userToFollow) {
        userToFollow.followers = userToFollow.followers.filter(follower => follower._id.toString() !== id);
        user.following = user.following.filter(follower => follower._id.toString() !== userId);

        try {
          yield user.save();
          yield userToFollow.save();
        } catch (error) {
          next(error);
        }

        res.send(userToFollow.followers);
      } else {
        res.status(404).send("Users not Found");
      }
    } else {
      res.status(404).send(id ? "No Valid ID Detected" : userId ? "No Valid UserID Detected" : "No Valid User and  ID Detected");
    }
  });

  return function unfollowUser(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

exports.unfollowUser = unfollowUser;

var searchUser = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res, next) {
    var {
      query
    } = req.params;

    if (query) {
      var users;

      try {
        users = yield _user.default.fuzzySearch(query);
      } catch (error) {
        next(error);
      }

      if (users) {
        res.send(users);
      } else res.status(404).send("No users found ");
    } else res.status(404).send("Please fill in a Query");
  });

  return function searchUser(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

exports.searchUser = searchUser;

var recommendUsers = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res, next) {
    var {
      following,
      _id
    } = req.user;

    if (following) {
      var users;

      try {
        users = yield _user.default.find({
          _id: {
            $nin: [...following, _id]
          }
        }).sort({
          followers: -1
        }).limit(10);
      } catch (error) {
        next(error);
      }

      if (users) {
        res.send(users);
      } else res.status(404).send("No on to follow Found");
    } else res.status(404).send("No user Found");
  });

  return function recommendUsers(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();

exports.recommendUsers = recommendUsers;
//# sourceMappingURL=userController.js.map