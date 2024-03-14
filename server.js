// 1. Import Exprerss
import express from "express";
import swagger from "swagger-ui-express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import apiDocs from "./swagger.json" assert { type: "json" };
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import mongoose from "mongoose";
import postRouter from "./src/features/posts/postRoutes.js";
import commentsRouter from "./src/features/comments/commentsRouter.js";
import likesRouter from "./src/features/likes/likesRoutes.js";
import friendsRouter from "./src/features/friends/friendsRoutes.js";
// 2. Create Server
const server = express();

// load all the environment variables in application
dotenv.config();

// CORS policy configuration
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5500");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  // return ok for preflight request.
  if (req.method == "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

server.use(express.json());
server.use(cookieParser());

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

server.use(loggerMiddleware);
server.use("/api/posts", jwtAuth, postRouter);
server.use("/api/comments", jwtAuth, commentsRouter);
server.use("/api/likes", jwtAuth, likesRouter);
server.use("/api/friends", jwtAuth, friendsRouter);
server.use("/api/users", userRouter);
// 3. Default request handler
server.get("/", (req, res) => {
  res.send("Welcome to Social Mdeia APIs");
});

// Error handler middleware
server.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err.message);
  }
  if (err instanceof ApplicationError) {
    return res.status(err.code).send(err.message);
  }

  // server errors.
  res.status(500).send("Something went wrong, please try later");
});

// 4. Middleware to handle 404 requests.
server.use((req, res) => {
  res
    .status(404)
    .send(
      "API not found. Please check our documentation for more information at localhost:3200/api-docs"
    );
});

// 5. Specify port.
server.listen(8000, () => {
  console.log("Server is running at 3200");
  // connectToMongoDB();
  connectUsingMongoose();
});
