import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello");
});

app.listen(4000, () => {
  console.log("Hello World!");
});
