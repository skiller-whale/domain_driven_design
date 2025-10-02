import type { Application } from './Application';
import type { ApplicationId } from './ApplicationId';

export interface ApplicationRepository {
  getById(id: ApplicationId): Promise<Application | undefined>;
  save(application: Application): Promise<void>;
}

