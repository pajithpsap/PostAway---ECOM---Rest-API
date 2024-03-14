import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async resetPassword(req, res, next) {
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const userID = req.userID;
    try {
      await this.userRepository.resetPassword(userID, hashedPassword);
      res.status(200).send("Password is updated");
    } catch (err) {
      console.log(err);
      console.log("Passing error to middleware");
      next(err);
    }
  }

  async signUp(req, res, next) {
    const { name, email, gender, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = {
        name,
        email,
        gender,
        hashedPassword,
      };
      const data = await this.userRepository.signUp(user);
      // console.log(data);
      res.status(201).send(user);
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      // 1. Find user by email.
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        return res.status(400).send("Incorrect Credentials");
      } else {
        // 2. Compare password with hashed password.
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          // 3. Create token.
          const token = jwt.sign(
            {
              userID: user._id,
              email: user.email,
            },
            "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz",
            {
              expiresIn: "1h",
            }
          );
          // 4. Send token.
          res
            .status(201)
            .cookie("jwtToken", token, { maxAge: 900000, httpOnly: false })
            .json({ status: "success", msg: "login successfull", token });
        } else {
          return res.status(400).send("Incorrect Credentials");
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }

  async signOut(req,res){
    res.cookie('jwtToken','',{maxAge: 1});
    return res.send("logged out successfully");
  }

  async getDetails(req, res) {
    try {
      const userId = req.params.userId;
      const user = await this.userRepository.getDetailsById(userId);
      //console.log(user);
      if (!user) {
        return res.status(400).send("Incorrect Credentials");
      } else {
        return res.status(200).send(user);
      }
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  }

  async getAllDetails(req, res) {
    try {
      const users = await this.userRepository.getAllDetails();
      return res.status(200).send(users);
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  }

  async updateDetails(req, res) {
    try {
      const name = req.body.name;
      const userId = req.params.userId;
      const user = await this.userRepository.updateDetails(name, userId);
      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send("Something went wrong");
    }
  }
}
