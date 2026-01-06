import { ApplicationRejectedEvent } from "../../domain/application/ApplicationRejectedEvent";
import type { ApplicationRepository } from "../../domain/application/ApplicationRepository";
import type { EmailService } from "../../infrastructure/EmailService";
import type { EventHandler } from "../../infrastructure/EventBroker";

export class EmailOnApplicationRejected implements EventHandler<ApplicationRejectedEvent> {
  private repo: ApplicationRepository;
  private emailService: EmailService;

  constructor(repo: ApplicationRepository, emailService: EmailService) {
    this.repo = repo;
    this.emailService = emailService;
  }

  async handle(event: ApplicationRejectedEvent) {
    const application = await this.repo.getById(event.applicationId);

    if (!application) {
      throw new Error(`Application not found for id ${event.applicationId.value}`);
    }

    const email = application.emailAddress!.value;

    await this.emailService.send({
      to: email,
      subject: 'Application Rejected',
      body: 'We are sorry to inform you...'
    });
  }
}
