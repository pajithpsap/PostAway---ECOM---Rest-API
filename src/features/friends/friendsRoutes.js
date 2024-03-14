import express from "express";
import FriendsController from "./friendsController.js";

const friendsRouter = express.Router();

const friendsController = new FriendsController();

friendsRouter.get("/get-friends/:userId", (req,res)=>{
    friendsController.getFriends(req,res)
});
friendsRouter.get("/get-pending-requests", (req,res)=>{
    friendsController.getPendingRequests(req,res)
});
friendsRouter.post("/send-request/:friendId", (req,res)=>{
    friendsController.sendFriendRequests(req,res)
})
friendsRouter.put("/toggle-friendship/:friendId", (req,res)=>{
    friendsController.toggleFriendship(req,res)
});
friendsRouter.put("/response-to-request/:friendId", (req,res)=>{
    friendsController.responseToRequest(req,res)
});
export default friendsRouter;
