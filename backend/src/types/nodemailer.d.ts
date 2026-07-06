declare module 'nodemailer' {
  export interface SentMessageInfo {
    messageId: string;
  }

  export interface Transporter {
    sendMail(mailOptions: Record<string, unknown>): Promise<SentMessageInfo>;
  }

  export function createTransport(
    options: Record<string, unknown>,
  ): Transporter;
}