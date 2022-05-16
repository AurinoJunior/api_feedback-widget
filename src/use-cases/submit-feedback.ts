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

    if (!type) throw new Error("Type is required");

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }

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
