import { Application } from '../../domain/application/Application';
import { ApplicationId } from '../../domain/application/ApplicationId';
import { ApplicationReceivedDateTime } from '../../domain/application/ApplicationReceivedDateTime';
import type { ApplicationRepository } from '../../domain/application/ApplicationRepository';
import { EmailAddress } from '../../domain/application/EmailAddress';
import { FullName } from '../../domain/application/FullName';
import { PhoneNumber } from '../../domain/application/PhoneNumber';

export interface FillOutBasicDetailsCommand {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
}

export interface FillOutBasicDetailsResult {
  applicationId: string; // UUIDv4
}

export class FillOutBasicDetailsService {
  private repo: ApplicationRepository;

  constructor(repo: ApplicationRepository) {
    this.repo = repo;
  }

  async execute(cmd: FillOutBasicDetailsCommand): Promise<FillOutBasicDetailsResult> {
    try {
      const id = ApplicationId.generate();
      const received = new ApplicationReceivedDateTime(this.serverTime());
      const application = new Application(id, received);
      const fullName = new FullName(cmd.fullName);
      const phoneNumber = new PhoneNumber(cmd.phoneNumber);
      const emailAddress = new EmailAddress(cmd.emailAddress);
      application.fillOutBasicDetails(fullName, emailAddress, phoneNumber);
      await this.repo.save(application);
      return { applicationId: id.value };
    } catch (e) {
      throw new Error(`Failed to fill out basic details: ${(e as Error).message}`);
    }
  }

  private serverTime(): string {
    const now = new Date();
    return [
      now.getUTCFullYear(),
      String(now.getUTCMonth() + 1).padStart(2, '0'),
      String(now.getUTCDate()).padStart(2, '0'),
    ].join('-') + 'T' + [
      String(now.getUTCHours()).padStart(2, '0'),
      String(now.getUTCMinutes()).padStart(2, '0'),
      String(now.getUTCSeconds()).padStart(2, '0'),
    ].join(':') + 'Z';
  }
}
