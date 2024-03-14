import PostRepository from "./postRepository.js";

export default class PostController {
  constructor() {
    this.postRepo = new PostRepository();
  }

  async addPost(req, res) {
    try {
      const { caption } = req.body;
      const fileName = req.file.filename;
      // console.log(fileName);
      const userID = req.userID;
      const newPost = await this.postRepo.addPost({
        caption,
        fileName,
        userID,
      });
      return res.status(201).send(newPost);
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  }
  async getOnePost(req, res) {
    try {
      const postID = req.params.postId;
      //  const userID = req.userID;
      const post = await this.postRepo.getOnePost(postID);
      if (post) {
        return res.status(200).send(post);
      } else {
        return res.status(400).send("Incorrect Details - getOnePost");
      }
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  }
  async getPosts(req, res) {
    try {
      const userID = req.userID;
      const posts = await this.postRepo.getPosts(userID);
      if (posts) {
        return res.status(200).send(posts);
      } else {
        return res.status(400).send("Incorrect Details - getPosts");
      }
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  }
  async getPostsAll(req, res) {
    try {
      const allPosts = await this.postRepo.getPostsAll();
      if (allPosts) {
        return res.status(200).send(allPosts);
      } else {
        return res.status(400).send("Incorrect Details - getAllPosts");
      }
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  }
  async deletePost(req, res) {
    try {
      const postID = req.params.postId;
      const userID = req.userID;
      const deletedPost = await this.postRepo.deletePost(postID, userID);
      if (deletedPost) {
        return res.status(200).send(deletedPost);
      } else {
        return res.status(400).send("Incorrect Details - deletePost");
      }
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  }
  async updatePost(req, res) {
    try {
      const postID = req.params.postId;
      const userID = req.userID;
      const caption = req.body.caption;
      const fileName = req.file.filename;

      const updatedPost = await this.postRepo.updatePost({
        postID,
        userID,
        caption,
        fileName,
      });
      if (updatedPost) {
        return res.status(200).send(updatedPost);
      } else {
        return res.status(400).send("Incorrect Details - updatedPost");
      }
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  }
}
