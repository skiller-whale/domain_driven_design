import type { DomainEvent } from "../DomainEvent";
import type { ApplicationId } from "./ApplicationId";

export class ApplicationRejectedEvent implements DomainEvent {
  public readonly applicationId: ApplicationId;

  constructor(applicationId: ApplicationId) {
    this.applicationId = applicationId;
  }
}
