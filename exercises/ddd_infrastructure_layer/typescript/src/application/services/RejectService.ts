import { ApplicationId } from '../../domain/application/ApplicationId';
import type { ApplicationRepository } from '../../domain/application/ApplicationRepository';
import type { EventBroker } from '../../infrastructure/EventBroker';

export interface RejectCommand {
  applicationId: string; // UUIDv4
}

export class RejectService {
  private repo: ApplicationRepository;
  private eventBroker: EventBroker;

  constructor(repo: ApplicationRepository, eventBroker: EventBroker) {
    this.repo = repo;
    this.eventBroker = eventBroker;
  }

  async execute(cmd: RejectCommand) {
    const id = new ApplicationId(cmd.applicationId);
    const application = await this.repo.getById(id);
    if (!application) {
      throw new Error(`Application not found for id ${cmd.applicationId}`);
    }

    try {
      application.reject();
    } catch (e) {
      throw new Error(`Failed to reject application: ${(e as Error).message}`);
    }

    await this.repo.save(application);

    await this.eventBroker.publishAll(application.pullEvents());
  }
}
