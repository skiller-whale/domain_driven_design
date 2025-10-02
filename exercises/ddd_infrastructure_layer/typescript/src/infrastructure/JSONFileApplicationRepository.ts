import { Application } from "../domain/application/Application";
import { ApplicationId } from "../domain/application/ApplicationId";
import type { ApplicationRepository } from "../domain/application/ApplicationRepository";

// @TODO you will need to design a suitable structure for the store
type ApplicationStoreRecord = {}
type Store = ApplicationStoreRecord[];

export class JSONFileApplicationRepository implements ApplicationRepository {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async getById(id: ApplicationId): Promise<Application | undefined> {
    let store = await this.loadStore();
    // ... @TODO ...
    // 1. Extract the relevant record from the store
    // 2. Reconstitute a valid Application from it
    //    (You will likely want to add a static `reconstitute` method to the Application class)
    return undefined;
  }

  async save(application: Application): Promise<void> {
    let store = await this.loadStore();
    // ... @TODO ...
    // 1. Convert the Application to a suitable record.
    // 2. Determine if an application with the same ID already exists in the store.
    // 3. If it does, update that record with the new details.
    // 4. If it doesn't, add a new record to the store.
    // 5. Save the updated store back to the file.
    await this.saveStore(store);
  }

  private async loadStore(): Promise<Store> {
    return await Bun.file(this.filePath).json();
  }

  private async saveStore(store: Store) {
    await Bun.write(this.filePath, JSON.stringify(store, null, 2));
  }
}
