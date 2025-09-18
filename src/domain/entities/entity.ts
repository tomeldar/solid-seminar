import { UUID } from '../value-objects/uuid.vo';

export interface EntityProps {
  id?: UUID | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Entity {
  protected _id: UUID;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  constructor(props?: EntityProps) {
    this._id = props?.id instanceof UUID ? props.id : new UUID(props?.id);
    const now = new Date();
    this._createdAt = props?.createdAt ?? now;
    this._updatedAt = props?.updatedAt ?? now;
  }

  get id(): UUID {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  touch(): void {
    this._updatedAt = new Date();
  }

  equals(other: Entity | UUID | string): boolean {
    if (other instanceof Entity) return this._id.equals(other.id);
    return this._id.equals(other);
  }

  toJSON() {
    return {
      id: this._id.toString(),
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
