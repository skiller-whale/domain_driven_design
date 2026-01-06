export class FileSavingEmailService {
  private directory: string;

  constructor(directory: string) {
    this.directory = directory;
  }

  async send(email: { to: string; subject: string; body: string }): Promise<void> {
    const filename = `${this.directory}/email_${Date.now()}.txt`;
    const file = Bun.file(filename);
    const content = `To: ${email.to}\nSubject: ${email.subject}\n\n${email.body}`;
    await Bun.write(file, content);
  }
}
