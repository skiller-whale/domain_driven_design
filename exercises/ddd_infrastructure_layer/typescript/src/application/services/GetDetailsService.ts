import { ApplicationId } from '../../domain/application/ApplicationId';
import type { ApplicationRepository } from '../../domain/application/ApplicationRepository';

export interface GetApplicationDetailsCommand {
  applicationId: string; // UUIDv4
}

export interface ApplicationDetailsResult {
  applicationId: string;
  stageName: string;
  receivedDateTime: string;
  fullName?: string;
  phoneNumber?: string;
  emailAddress?: string;
  motivationLetter?: string;
  statusName?: string;
}

export class GetDetailsService {
  private repo: ApplicationRepository;

  constructor(repo: ApplicationRepository) {
    this.repo = repo;
  }

  async execute(cmd: GetApplicationDetailsCommand): Promise<ApplicationDetailsResult> {
    const id = new ApplicationId(cmd.applicationId);
    const application = await this.repo.getById(id);
    if (!application) {
      throw new Error(`Application not found for id ${cmd.applicationId}`);
    }

    return {
      applicationId: application.id.value,
      receivedDateTime: application.receivedDateTime.value,
      fullName: application.fullName?.value,
      phoneNumber: application.phoneNumber?.value,
      emailAddress: application.emailAddress?.value,
      motivationLetter: application.motivationLetter?.value,
      stageName: application.stage?.name,
      statusName: application.status
    }
  }
}
