import { ApplicationId } from '../../domain/application/ApplicationId';
import type { ApplicationRepository } from '../../domain/application/ApplicationRepository';

export interface RejectCommand {
  applicationId: string; // UUIDv4
}

export class RejectService {
  private repo: ApplicationRepository;

  constructor(repo: ApplicationRepository) {
    this.repo = repo;
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
  }
}
