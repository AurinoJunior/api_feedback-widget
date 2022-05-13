export interface IMail {
  subject?: string;
  body: string;
}

export interface IMailAdapter {
  sendMail: (data: IMail) => Promise<void>;
}
