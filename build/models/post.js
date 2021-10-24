"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var {
  Schema,
  model
} = _mongoose.default;
var postSchema = new Schema({
  creator: {
    type: _mongoose.default.Types.ObjectId,
    ref: "User",
    required: true
  },
  body: {
    type: String,
    required: true
  },
  likes: [{
    type: _mongoose.default.Types.ObjectId,
    ref: "User"
  }],
  comments: [{
    body: {
      type: String,
      required: true
    },
    creator: {
      type: _mongoose.default.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  date: {
    type: Date,
    default: Date.now
  },
  picture: {
    type: String
  }
});
var Post = model("Post", postSchema);
var _default = Post;
exports.default = _default;
//# sourceMappingURL=post.js.map