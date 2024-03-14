import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

// creating model from schema.
const UserModel = mongoose.model("User", userSchema);

export default class UserRepository {
  async resetPassword(userID, hashedPassword) {
    try {
      let user = await UserModel.findById(userID);
      if (user) {
        user.password = hashedPassword;
        user.save();
      } else {
        throw new Error("No such user found");
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async signUp(user) {
    try {
      const { name, email, gender, hashedPassword } = user;
      // create instance of model.
      const newUser = new UserModel({
        name: name,
        email: email,
        gender: gender,
        password: hashedPassword,
      });
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
      }
    }
  }

  async signIn(email, password) {
    try {
      return await UserModel.findOne({ email, password });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getDetailsById(userId) {
    try {
      return await UserModel.findById(userId);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getAllDetails(){
    try {
      return await UserModel.find();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async updateDetails(new_name, userId){
    try {
      const user = await UserModel.findById(userId);
      user.name = new_name;
      await user.save();
      console.log(new_name);
      return user;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
