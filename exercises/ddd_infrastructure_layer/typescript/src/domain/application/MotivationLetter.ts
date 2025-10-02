export class MotivationLetter {
  private readonly _value: string;

  get value() { return this._value; }

  constructor(value: string) {
    this._value = value;
  }
}
