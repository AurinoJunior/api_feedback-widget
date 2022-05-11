import { Feedback } from "@prisma/client";
import express from "express";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2eab89882a193c",
    pass: "b66b5d164dabfd",
  },
});

app.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = <Feedback>req.body;

  const feedbackCreated = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  await transport.sendMail({
    from: "Naruto Uzumaki <narutinho123@email.com>",
    to: "Monkey D Luffy <reidospiratas@email.com>",
    subject: "Novo feedback",
    html: [
      "<div>",
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      "</div>",
    ].join(""),
  });

  return res.status(201).json(feedbackCreated);
});

app.listen(3333, () => {
  console.log("Server is running 🚀🚀");
});
