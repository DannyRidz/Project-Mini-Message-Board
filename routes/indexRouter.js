const { Router } = require("express");

const indexRouter = Router();

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

indexRouter.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Message Board",
    messages: messages,
  });
});

indexRouter.get("/messages/:messageId", (req, res) => {
  const messageId = Number(req.params.messageId);
  const message = messages[messageId];

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("message", {
    title: "Message Details",
    message: message,
  });
});

indexRouter.get("/new", (req, res) => {
  res.render("form", {
    title: "New Message",
  });
});

indexRouter.post("/new", (req, res) => {
  const { messageText, messageUser } = req.body;

  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date(),
  });

  res.redirect("/");
});

module.exports = indexRouter;
