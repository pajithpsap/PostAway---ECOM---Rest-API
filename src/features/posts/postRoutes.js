import express from "express";
import PostController from "./postController.js";
import { upload } from "../../middlewares/fileupload.middleware.js";
const postRouter = express.Router();

const postController = new PostController();

postRouter.post("/", upload.single("imageUrl"), (req, res) => {
  postController.addPost(req, res);
});
postRouter.get("/all", (req, res) => {
    postController.getPostsAll(req, res);
  });
postRouter.get("/:postId", (req, res) => {
  postController.getOnePost(req, res);
});
postRouter.get("/", (req, res) => {
  postController.getPosts(req, res);
});

postRouter.delete("/:postId", (req, res) => {
  postController.deletePost(req, res);
});
postRouter.put("/:postId", upload.single("imageUrl"), (req, res) => {
  postController.updatePost(req, res);
});

export default postRouter;
