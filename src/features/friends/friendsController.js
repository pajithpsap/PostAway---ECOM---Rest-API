import FriendsRepository from "./friendsRepository.js";

export default class FriendsController {
  constructor() {
    this.friendsRepo = new FriendsRepository();
  }
  async getFriends(req, res) {
    try {
      const userID = req.params.userId;
      const friends = await this.friendsRepo.getFriends(userID);
      console.log(userID);
      if (friends) {
        return res.status(200).send(friends);
      } else {
        return res.status(200).send("NO FRIENDS ADDED YET");
      }
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  }

  async getPendingRequests(req, res) {
    try {
      const userID = req.params.userId;
      const friends = await this.friendsRepo.getPendingRequests(userID);
      if (friends) {
        return res.status(200).send(friends);
      } else {
        return res.status(200).send("NO FRIEND REQUESTS YET");
      }
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  }

  async sendFriendRequests(req, res) {
    try {
      const friendID = req.params.friendId;
      await this.friendsRepo.sendFriendRequests(friendID, req.userID);
      return res.status(201).send("Request has been sent");
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  }

  async toggleFriendship(req,res){
    try {
        const friendID = req.params.friendId;
        await this.friendsRepo.toggleFriendship(friendID, req.userID);
        return res.status(201).send("Toggled the Friendship");
      } catch (err) {
        return res.status(500).send("Something went wrong");
      }
  }

  async responseToRequest(req,res){
    try {
        const friendID = req.params.friendId;
        await this.friendsRepo.responseToRequest(friendID, req.userID, req.query.action);
        return res.status(201).send("Reuest has been responded");
      } catch (err) {
        return res.status(500).send("Something went wrong");
      }
  }
}
