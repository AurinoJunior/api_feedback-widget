import { IFeedback, IFeedbackRepository } from "../feedbacks-repository";
import { prisma } from "../../prisma";

export class PrimasFeedbackRepository implements IFeedbackRepository {
  async create({ type, comment, screenshot }: IFeedback) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}
