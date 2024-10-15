const express = require("express");

const path = require("node:path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.post("/new", (req, res, next) => {
  const { messageText, messageAuthor } = req.body;
  messages.push({ text: messageText, user: messageAuthor, added: new Date() });
  res.redirect("/");
});
app.get("/new", (req, res, next) => {
  res.render("form");
});
app.get("/message/:id", (req, res, next) => {
  res.render("message", { messages: messages[req.params.id] });
});
app.get("/", (req, res, next) => {
  res.render("index", { messages });
});
app.listen(3000, () => {
  console.log("Your server is running at localhost:3000");
});
