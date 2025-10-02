import type { ApplicationRepository } from '../domain/application/ApplicationRepository';
import type { Application } from '../domain/application/Application';
import type { ApplicationId } from '../domain/application/ApplicationId';

export class InMemoryApplicationRepository implements ApplicationRepository {
  private entries = new Map<string, Application>();

  async getById(id: ApplicationId) {
    return this.entries.get(id.value);
  }

  async save(application: Application) {
    this.entries.set(application.id.value, application);
  }
}

