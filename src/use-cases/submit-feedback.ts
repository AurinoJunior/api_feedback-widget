import { IMailAdapter } from "../adapters/mail-adapter";
import {
  IFeedback,
  IFeedbackRepository,
} from "../repositories/feedbacks-repository";

export class SubmitFeedBack {
  constructor(
    private feedbackRepository: IFeedbackRepository,
    private nodemailerAdapter: IMailAdapter
  ) {}

  async execute(request: IFeedback) {
    const { type, comment, screenshot } = request;

    await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.nodemailerAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        "<div>",
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        "</div>",
      ].join(""),
    });
  }
}
