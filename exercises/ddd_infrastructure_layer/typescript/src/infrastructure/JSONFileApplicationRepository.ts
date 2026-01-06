import { Application } from "../domain/application/Application";
import { ApplicationId } from "../domain/application/ApplicationId";
import { ApplicationReceivedDateTime } from "../domain/application/ApplicationReceivedDateTime";
import type { ApplicationRepository } from "../domain/application/ApplicationRepository";
import { ApplicationStage, ApplicationStages } from "../domain/application/ApplicationStage";
import { ApplicationStatus } from "../domain/application/ApplicationStatus";
import { EmailAddress } from "../domain/application/EmailAddress";
import { FullName } from "../domain/application/FullName";
import { MotivationLetter } from "../domain/application/MotivationLetter";
import { PhoneNumber } from "../domain/application/PhoneNumber";

// We specify a structure for storing records
type ApplicationStoreRecord = {
  id: string;
  receivedDateTime: string;
  fullName: string | undefined;
  phoneNumber: string | undefined;
  emailAddress: string | undefined;
  motivationLetter: string | undefined;
  stage: string;
  status: string;
};
type Store = ApplicationStoreRecord[];

export class JSONFileApplicationRepository implements ApplicationRepository {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async getById(id: ApplicationId): Promise<Application | undefined> {
    let store = await this.loadStore();

    // Find the record with the matching ID
    let record = store.find(r => r.id === id.value);
    if (!record) { // If not found, return undefined
      return undefined;
    }

    // Reconstitute the value objects
    let applicationId = new ApplicationId(record.id);
    let receivedDateTime = new ApplicationReceivedDateTime(record.receivedDateTime);

    let fullName = undefined;
    if (record.fullName) {
      fullName = new FullName(record.fullName);
    }

    let phoneNumber = undefined;
    if (record.phoneNumber) {
      phoneNumber = new PhoneNumber(record.phoneNumber);
    }

    let emailAddress = undefined;
    if (record.emailAddress) {
      emailAddress = new EmailAddress(record.emailAddress);
    }

    let motivationLetter = undefined;
    if (record.motivationLetter) {
      motivationLetter = new MotivationLetter(record.motivationLetter);
    }

    let stage = this.findStageForName(record.stage);

    let status = ApplicationStatus.InProgress;
    if (this.isValidApplicationStatus(record.status)) {
      status = record.status;
    }

    let fields = {
      id: applicationId,
      receivedDateTime: receivedDateTime,
      fullName: fullName,
      phoneNumber: phoneNumber,
      emailAddress: emailAddress,
      motivationLetter: motivationLetter,
      stage: stage,
      status: status,
    };

    if (!stage.isValidForStage(fields)) {
      throw new Error("Inconsistent data for application stage");
    }

    // Reconstitute the Application entity
    return Application.reconstitute(fields);
  }

  async save(application: Application): Promise<void> {
    let store = await this.loadStore();

    // Convert the Application to a storable record
    let record: ApplicationStoreRecord = {
      id: application.id.value,
      receivedDateTime: application.receivedDateTime.value,
      fullName: application.fullName?.value,
      phoneNumber: application.phoneNumber?.value,
      emailAddress: application.emailAddress?.value,
      motivationLetter: application.motivationLetter?.value,
      stage: application.stage.name,
      status: application.status,
    };

    // Check if the record already exists (by ID)
    let existingIndex = store.findIndex(r => r.id === application.id.value);

    if (existingIndex !== -1) {
      // If it does, update it
      store[existingIndex] = record;
    } else {
      // If not, add it
      store.push(record);
    }

    await this.saveStore(store);
  }

  private async loadStore(): Promise<Store> {
    return await Bun.file(this.filePath).json();
  }

  private async saveStore(store: Store) {
    await Bun.write(this.filePath, JSON.stringify(store, null, 2));
  }

  private findStageForName(name: string): ApplicationStage {
    const stage = ApplicationStages.find(s => s.name === name);
    if (!stage) {
      throw new Error(`Unknown stage name: ${name}`);
    }
    return stage;
  }

  private isValidApplicationStatus(value: string): value is ApplicationStatus {
    return Object.values(ApplicationStatus).includes(value as ApplicationStatus);
  }
}

