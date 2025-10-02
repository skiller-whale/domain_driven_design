import type { ApplicationId } from "./ApplicationId";
import type { ApplicationReceivedDateTime } from "./ApplicationReceivedDateTime";
import type { EmailAddress } from "./EmailAddress";
import type { FullName } from "./FullName";
import type { MotivationLetter } from "./MotivationLetter";
import type { PhoneNumber } from "./PhoneNumber";

export class Application {
  private _id: ApplicationId;
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

  constructor(id: ApplicationId, receivedDateTime: ApplicationReceivedDateTime) {
    if (!id || !receivedDateTime) {
      throw new Error("id and receivedDateTime are required");
    }
    this._id = id;
    this._receivedDateTime = receivedDateTime;
  }

  fillOutBasicDetails(fullName: FullName, emailAddress: EmailAddress, phoneNumber: PhoneNumber) {
    this._fullName = fullName;
    this._emailAddress = emailAddress;
    this._phoneNumber = phoneNumber;
  }

  submitMotivationLetter(motivationLetter: MotivationLetter) {
    if (!this.areBasicDetailsFilledOut()) {
      throw new Error("Cannot accept motivation letter before basic details are filled out");
    }
    this._motivationLetter = motivationLetter;
  }

  equals(other: Application) {
    return this._id.equals(other._id);
  }

  private areBasicDetailsFilledOut(): boolean {
    return !!(this._fullName && this._emailAddress && this._phoneNumber);
  }
}
