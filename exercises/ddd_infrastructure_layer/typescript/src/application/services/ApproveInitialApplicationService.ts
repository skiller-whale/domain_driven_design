import { ApplicationId } from "../../domain/application/ApplicationId";
import type { ApplicationRepository } from "../../domain/application/ApplicationRepository";

export interface ApproveInitialApplicationCommand {
  applicationId: string; // UUIDv4
}

export class ApproveInitialApplicationService {
  private repo: ApplicationRepository;

  constructor(repo: ApplicationRepository) {
    this.repo = repo;
  }

  async execute(cmd: ApproveInitialApplicationCommand) {
    const id = new ApplicationId(cmd.applicationId);
    const application = await this.repo.getById(id);

    if (!application) {
      throw new Error(`Application not found for id ${cmd.applicationId}`);
    }

    try {
      application.approveInitialApplication();
    } catch (e) {
      throw new Error(`Failed to approve initial application: ${(e as Error).message}`);
    }

    await this.repo.save(application);
  }
}
