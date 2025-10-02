export class PhoneNumber {
  private readonly _value: string;

  get value() { return this._value; }

  constructor(value: string) {
    if (!this.isValidPhoneNumber(value)) {
      throw new Error(`Invalid phone number: ${value}`);
    }
    this._value = value;
  }

  private isValidPhoneNumber(value: string): boolean {
    // We would use more robust validation in a real application
    const phoneNumberPattern = /^\d+$/;
    return phoneNumberPattern.test(value);
  }
}
