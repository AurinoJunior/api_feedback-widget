import { SubmitFeedBack } from "./submit-feedback";

const submitFeedback = new SubmitFeedBack(
  { create: async () => {} },
  { sendMail: async () => {} }
);

describe("Submit feeback", () => {
  test("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Example comment",
        screenshot: "data:image/png;base64",
      })
    ).resolves.not.toThrowError();
  });

  test("should not be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Example comment",
        screenshot: "data:image/png;base64",
      })
    ).rejects.toThrowError();
  });

  test("should be able to submit a feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Example comment",
        screenshot: "yagydsa",
      })
    ).rejects.toThrowError();
  });
});
