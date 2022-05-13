import { Router } from "express";
import { NodemailerAdapter } from "./adapters/nodemailer/nodemailer-adapter";

import { IFeedback } from "./repositories/feedbacks-repository";
import { PrimasFeedbackRepository } from "./repositories/prisma/prisma-feedback-repository";
import { SubmitFeedBack } from "./use-cases/submit-feedback";

export const routes = Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = <IFeedback>req.body;

  const prismaFeedbackRepository = new PrimasFeedbackRepository();
  const nodemailerAdapter = new NodemailerAdapter();
  const SubmitFeedBackUseCase = new SubmitFeedBack(
    prismaFeedbackRepository,
    nodemailerAdapter
  );

  SubmitFeedBackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
