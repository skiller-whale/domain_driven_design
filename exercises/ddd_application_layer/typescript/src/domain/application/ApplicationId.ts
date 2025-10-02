import crypto from 'crypto';

export class ApplicationId {
  private readonly _value: string;

  get value() { return this._value; }

  static generate() {
    return new ApplicationId(crypto.randomUUID());
  }

  constructor(value: string) {
    if (!isValidUUIDv4(value)) {
      throw new Error(`Invalid ApplicationID (must be UUIDv4 format, got ${value})`);
    }
    this._value = value;
  }

  equals(other: ApplicationId) {
    if (!(other instanceof ApplicationId)) {
      return false;
    }
    return this._value === other._value;
  }
}

function isValidUUIDv4(value: string): boolean {
  const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidV4Regex.test(value);
}
