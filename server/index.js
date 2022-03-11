require("dotenv").config();
const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const controllers = require("./controllers");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

app.use(cookieParser());

app.get("/", (req, res) => {
  return res.send("Hello");
});

// recipe openApi
app.get("/api", controllers.recipe);

// user
app.get("/auth", controllers.auth);
app.post("/login", controllers.login);
app.post("/logout", controllers.logout);
app.post("/signup", controllers.signup);
app.delete("/signout", controllers.signout);
app.post("/callback", controllers.google);

// food
app.post("/food", controllers.createFood);
app.patch("/food", controllers.updateFood);
app.delete("/food", controllers.deleteFood);

// myfrigo
app.get("/myfrigo", controllers.myfrigoFood);
app.patch("/mypage/:id", controllers.updateMypage);

// post
app.get("/post", controllers.getPost);
app.post("/post", controllers.createPost);
app.post("/quickpost", controllers.createPost);
app.patch("/post/:id", controllers.updatePost);
app.delete("/post/:id", controllers.deletePost);
app.post("/post/:postId/:plusOrMinus", controllers.like);

//comment
app.post("/comment/:id", controllers.createComment);
app.patch("/comment/:commentId", controllers.updateComment);
app.delete("/comment/:postId/:commentId", controllers.deleteComment);

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

app.listen(HTTPS_PORT, () => console.log("server open"));
