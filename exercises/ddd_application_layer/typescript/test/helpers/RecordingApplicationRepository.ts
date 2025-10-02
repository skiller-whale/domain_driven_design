import type { ApplicationRepository } from "../../src/domain/application/ApplicationRepository";
import type { Application } from "../../src/domain/application/Application";
import type { ApplicationId } from "../../src/domain/application/ApplicationId";

export class RecordingApplicationRepository implements ApplicationRepository {
  private readonly store = new Map<string, Application>();
  public readonly saved: Application[] = [];

  constructor(initial: Application[] = []) {
    for (const application of initial) {
      this.store.set(application.id.value, application);
    }
  }

  async getById(id: ApplicationId): Promise<Application | undefined> {
    return this.store.get(id.value);
  }

  async save(application: Application): Promise<void> {
    this.saved.push(application);
    this.store.set(application.id.value, application);
  }
}
