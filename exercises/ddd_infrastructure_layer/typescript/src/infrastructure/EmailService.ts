export interface EmailService {
  send(email: { to: string; subject: string; body: string }): Promise<void>;
}
