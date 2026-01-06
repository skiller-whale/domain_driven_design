import type { DomainEvent } from "../DomainEvent";
import { ApplicationId } from "./ApplicationId";
import { ApplicationReceivedDateTime } from "./ApplicationReceivedDateTime";
import { ApplicationRejectedEvent } from "./ApplicationRejectedEvent";
import { ApplicationStage } from "./ApplicationStage";
import { ApplicationStatus } from "./ApplicationStatus";
import { EmailAddress } from "./EmailAddress";
import { FullName } from "./FullName";
import { MotivationLetter } from "./MotivationLetter";
import { PhoneNumber } from "./PhoneNumber";

export class Application {
  private _events: DomainEvent[] = [];

  private _id: ApplicationId;
  private _stage: ApplicationStage = ApplicationStage.Zero;
  private _status: ApplicationStatus = ApplicationStatus.InProgress;
  private _receivedDateTime: ApplicationReceivedDateTime;
  private _fullName?: FullName;
  private _emailAddress?: EmailAddress;
  private _phoneNumber?: PhoneNumber;
  private _motivationLetter?: MotivationLetter;

  get id() { return this._id; }
  get receivedDateTime() { return this._receivedDateTime; }
  get fullName() { return this._fullName; }
  get emailAddress() { return this._emailAddress; }
  get phoneNumber() { return this._phoneNumber; }
  get motivationLetter() { return this._motivationLetter; }
  get stage() { return this._stage; }
  get status() { return this._status; }

  static reconstitute(fields: {
    id: ApplicationId;
    receivedDateTime: ApplicationReceivedDateTime;
    fullName: FullName | undefined;
    phoneNumber: PhoneNumber | undefined;
    emailAddress: EmailAddress | undefined;
    motivationLetter: MotivationLetter | undefined;
    stage: ApplicationStage;
    status: ApplicationStatus;
  }) {
    const app = new Application(fields.id, fields.receivedDateTime);
    app._fullName = fields.fullName;
    app._phoneNumber = fields.phoneNumber;
    app._emailAddress = fields.emailAddress;
    app._motivationLetter = fields.motivationLetter;
    app._stage = fields.stage;
    app._status = fields.status;
    return app;
  }

  constructor(id: ApplicationId, receivedDateTime: ApplicationReceivedDateTime) {
    if (!id || !receivedDateTime) {
      throw new Error("id and receivedDateTime are required");
    }
    this._id = id;
    this._receivedDateTime = receivedDateTime;
  }

  fillOutBasicDetails(fullName: FullName, emailAddress: EmailAddress, phoneNumber: PhoneNumber) {
    const newFields = { ...this.fields(), fullName, emailAddress, phoneNumber };
    if (!ApplicationStage.One.isValidForStage(newFields)) {
      throw new Error("Invalid data or application not in correct stage");
    }
    this._fullName = fullName;
    this._emailAddress = emailAddress;
    this._phoneNumber = phoneNumber;
    this._stage = ApplicationStage.One;
  }

  submitMotivationLetter(motivationLetter: MotivationLetter) {
    const newFields = { ...this.fields(), motivationLetter };
    if (!ApplicationStage.Two.isValidForStage(newFields)) {
      throw new Error("Invalid data or application not in correct stage");
    }
    this._motivationLetter = motivationLetter;
    this._stage = ApplicationStage.Two;
  }

  approveInitialApplication() {
    if (!ApplicationStage.Three.isValidForStage(this.fields())) {
      throw new Error("Application not in correct stage to approve");
    }
    this._stage = ApplicationStage.Three;
  }

  reject() {
    this._status = ApplicationStatus.Rejected;

    this._events.push(new ApplicationRejectedEvent(this._id));
  }

  equals(other: Application) {
    return this._id.equals(other._id);
  }

  pullEvents() {
    const events = this._events;
    this._events = [];
    return events;
  }

  private fields(): Record<string, any> {
    return {
      id: this.id,
      receivedDateTime: this.receivedDateTime,
      fullName: this.fullName,
      emailAddress: this.emailAddress,
      phoneNumber: this.phoneNumber,
      motivationLetter: this.motivationLetter,
    };
  }
}
