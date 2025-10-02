export class ApplicationReceivedDateTime {
  private readonly _value: string;

  get value() { return this._value; }

  constructor(value: string) {
    if (!isValidISO8601(value)) {
      throw new Error(`Invalid ApplicationReceivedDateTime (must be ISO 8601 format, got ${value})`);
    }
    if (!isUTC(value)) {
      throw new Error(`Invalid ApplicationReceivedDateTime (must be in UTC, got ${value})`);
    }
    this._value = value;
  }
}

function isValidISO8601(value: string): boolean {
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
  return iso8601Regex.test(value);
}

function isUTC(value: string): boolean {
  return value.endsWith("Z");
}
