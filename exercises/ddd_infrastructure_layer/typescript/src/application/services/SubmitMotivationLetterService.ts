import type { ApplicationRepository } from '../../domain/application/ApplicationRepository';
import { ApplicationId } from '../../domain/application/ApplicationId';
import { MotivationLetter } from '../../domain/application/MotivationLetter';

export interface SubmitMotivationLetterCommand {
  applicationId: string; // UUIDv4
  motivationLetter: string;
}

export class SubmitMotivationLetterService {
  private repo: ApplicationRepository;

  constructor(repo: ApplicationRepository) {
    this.repo = repo;
  }

  async execute(cmd: SubmitMotivationLetterCommand): Promise<void> {
    const id = new ApplicationId(cmd.applicationId);
    const app = await this.repo.getById(id);
    if (!app) {
      throw new Error('Application not found');
    }

    try {
      const motivationLetter = new MotivationLetter(cmd.motivationLetter);
      app.submitMotivationLetter(motivationLetter);
    } catch (e) {
      throw new Error(`Failed to fill out motivation letter: ${(e as Error).message}`);
    }

    await this.repo.save(app);
  }
}
