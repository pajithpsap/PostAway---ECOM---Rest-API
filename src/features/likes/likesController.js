import LikesRepository from "./likesRepository.js";

export default class LikesController {
  constructor() {
    this.likesRepo = new LikesRepository();
  }

  async addLike(req, res) {
    try {
      const id = req.params.id;
      const type = req.query.type;
      const userID = req.userID;
      if (type === 'post') {
        await this.likesRepo.addLikePost({id, userID});
      } else {
        await this.likesRepo.addLikeCommnet({id, userID});
      }
      return res.status(201).send("Like added");
    } catch (err) {
        console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }

  async toggleLike(req, res) {
    try {
      const id = req.params.id;
      const type = req.query.type;
      const userID = req.userID;
      if (type === 'post') {
        await this.likesRepo.toggleLikePost(id, userID);
      } else {
        await this.likesRepo.toggleLikeComment(id, userID);
      }
      return res.status(201).send("Toggled the like");
    } catch (err) {
        console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }
}
