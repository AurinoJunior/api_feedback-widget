export interface IFeedback {
  type: string;
  comment?: string;
  screenshot?: string;
}

export interface IFeedbackRepository {
  create: (data: IFeedback) => Promise<void>;
}
