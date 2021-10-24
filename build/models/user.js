"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseFuzzySearching = _interopRequireDefault(require("mongoose-fuzzy-searching"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var {
  Schema,
  model
} = _mongoose.default;
var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  displayname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  following: [{
    type: _mongoose.default.Types.ObjectId,
    ref: "User"
  }],
  followers: [{
    type: _mongoose.default.Types.ObjectId,
    ref: "User"
  }],
  posts: [{
    type: _mongoose.default.Types.ObjectId,
    ref: "Post"
  }],
  picture: {
    type: String,
    default: "https://i.imgur.com/von5DZb.jpg"
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  about: {
    summary: {
      type: String
    },
    work: {
      type: String
    },
    education: {
      type: String
    },
    birthday: {
      type: Date
    }
  }
});
userSchema.plugin(_mongooseFuzzySearching.default, {
  fields: ["username", "displayname"]
});
var User = model("User", userSchema);
var _default = User;
exports.default = _default;
//# sourceMappingURL=user.js.map