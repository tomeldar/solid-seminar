import { v4 as uuidv4, validate as uuidValidate, version as uuidVersion } from 'uuid';

/**
 * Value object for a UUID.
 * - If constructed without an argument, generates a new UUID using uuid.v4().
 * - If provided a string, validates it using the `uuid` package (checks format and version 1-5).
 */
export class UUID {
  private readonly _id: string;

  constructor(input?: string) {
    if (input === undefined || input === null || String(input).trim() === '') {
      this._id = uuidv4();
      return;
    }

    const candidate = String(input).trim().toLowerCase();

    if (!UUID.isValid(candidate)) {
      throw new TypeError(`Invalid UUID: ${candidate}`);
    }

    this._id = candidate;
  }

  static isValid(value: unknown): boolean {
    if (typeof value !== 'string') return false;

    const s = value.trim();
    if (!uuidValidate(s)) return false;

    // uuidVersion returns a number (1..5) for valid UUIDs, but may throw if invalid in some versions.
    // We already ran uuidValidate, so calling uuidVersion is safe.
    const ver = uuidVersion(s);
    return ver >= 1 && ver <= 5;
  }

  toString(): string {
    return this._id;
  }

  toJSON(): string {
    return this._id;
  }

  get value(): string {
    return this._id;
  }

  equals(other: UUID | string): boolean {
    if (other instanceof UUID) return this._id === other._id;
    return this._id === String(other).toLowerCase();
  }
}
