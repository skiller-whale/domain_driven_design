export class EmailAddress {
  private readonly _value: string;

  get value() { return this._value; }

  constructor(value: string) {
    if (!this.isValidEmail(value)) {
      throw new Error(`Invalid email address: ${value}`);
    }
    this._value = value;
  }

  private isValidEmail(value: string): boolean {
    // We would use more robust validation in a real application
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  }
}
