import { Router } from "express";
import * as userController from "../controllers/userController";
import * as postController from "../controllers/postController";

let router = Router();
//User
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
router.get("/recommend", userController.recommendUsers);
//Post
router.post("/post", postController.createPost);
router.patch("/post", postController.updatePost);
router.post("/post/delete", postController.removePost);
router.get("/post/:postId", postController.readPost);
router.get("/feed/:id", postController.readPostsByFollowed);
router.patch("/like", postController.likePost);
//Comments
router.post("/comment", postController.createComment);
router.post("/remove-comment", postController.removeComment);

export default router;

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
