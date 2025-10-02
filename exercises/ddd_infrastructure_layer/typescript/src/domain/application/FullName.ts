export class FullName {
  private readonly _value: string;

  get value() { return this._value; }

  constructor(value: string) {
    if (!this.isValidName(value)) {
      throw new Error(`Invalid full name: ${value}`);
    }
    this._value = value;
  }

  private isValidName(value: string): boolean {
    return !!value && value.trim().length > 0;
  }
}
