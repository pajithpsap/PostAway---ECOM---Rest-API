import mongoose from "mongoose";
import { userSchema } from "../user/user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

const UserModel = mongoose.model("User", userSchema);

export default class FriendsRepository {
  async getFriends(userID) {
    try {
      const friend = await UserModel.findById(userID).select('friends');
     // console.log(friends);
      return friend;
    } catch (err) {
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getPendingRequests(userID) {
    try {
      const pendingRequests = await UserModel.findById(userID).select({
        friendRequests,
      });
      return pendingRequests;
    } catch (err) {
        throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async sendFriendRequests(friendID, userID) {
    try {
      const friend = await UserModel.findById(friendID);
      friend.friendRequests.push(userID);
      await friend.save();
    } catch (err) {
        throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async toggleFriendship(friendID, userID) {
    try {
      const friend = await UserModel.exists({
        friends: friendID,
      });
      console.log(friend);
      if (friend) {
        await UserModel.updateOne(
          {
            _id: new mongoose.Types.ObjectId(userID),
          },
          {
            $pull: {
              friends: new mongoose.Types.ObjectId(friendID),
            },
          }
        );
      } else {
        const friend1 = await UserModel.findById(userID);
        friend1.friends.push(friendID);
        await friend1.save();
      }
    } catch (err) {
        throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async responseToRequest(friendID, userID, action) {
    try {
      const friend = await UserModel.findById(userID);
      if (action === "accept") {
        friend.friends.push(friendID);
        await UserModel.updateOne(
          {
            _id: new mongoose.Types.ObjectId(userID),
          },
          {
            $pull: {
              friendRequests: new mongoose.Types.ObjectId(friendID),
            },
          }
        );
        await friend.save();
      } else {
        await UserModel.updateOne(
          {
            _id: new mongoose.Types.ObjectId(userID),
          },
          {
            $pull: {
              friendRequests: new mongoose.Types.ObjectId(friendID),
            },
          }
        );
      }
    } catch (err) {
        throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
