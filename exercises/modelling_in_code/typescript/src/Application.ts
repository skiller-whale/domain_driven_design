import type { ApplicationId } from "./ApplicationId";
import type { ApplicationReceivedDateTime } from "./ApplicationReceivedDateTime";

export class Application {
  private id: ApplicationId;
  private receivedDateTime: ApplicationReceivedDateTime;

  constructor(id: ApplicationId, receivedDateTime: ApplicationReceivedDateTime) {
    if (!id || !receivedDateTime) {
      throw new Error("id and receivedDateTime are required");
    }
    this.id = id;
    this.receivedDateTime = receivedDateTime;
  }

  equals(other: Application) {
    return this.id.equals(other.id);
  }
}
