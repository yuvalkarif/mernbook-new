"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var userController = _interopRequireWildcard(require("../controllers/userController"));

var postController = _interopRequireWildcard(require("../controllers/postController"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)(); //User

router.post("/signup", userController.signup); // (username,password,displayname)

router.post("/login", userController.login); // (username,password)

router.post("/logout", userController.logout);
router.get("/auth", userController.currentUser); // to be logged in ()

router.get("/user/:id", userController.getUser); // (id)

router.get("/username/:username", userController.getUserByUsername); // (id)

router.patch("/user", userController.updateUser); // (id, picture?, summary?, work?, education?, birthday?)

router.patch("/follow", userController.followUser); // (id,userId)

router.patch("/unfollow", userController.unfollowUser); // (id,userId)

router.get("/search/:query", userController.searchUser);
router.get("/recommend", userController.recommendUsers); //Post

router.post("/post", postController.createPost);
router.patch("/post", postController.updatePost);
router.post("/post/delete", postController.removePost);
router.get("/post/:postId", postController.readPost);
router.get("/feed/:id", postController.readPostsByFollowed);
router.patch("/like", postController.likePost); //Comments

router.post("/comment", postController.createComment);
router.post("/remove-comment", postController.removeComment);
var _default = router;
/*

    [x] API Route-Manage all CRUD Options
    [v]User
    [v]---Login
    [v]---Register
    [v]---Get User Profile
    [v]---Update
    [v]---Follow
    [v]---Unfollow
    [v]---Edit About
    [v]Posts
    [v]---Get All Posts By Followed
    [v]---Add new Post
    [v]---Edit your Posts
    [v]---Like/Unlike
    [v]Comment 
    [x]--Edit
    [x]--Like/Unlike

*/

exports.default = _default;
//# sourceMappingURL=api.js.map