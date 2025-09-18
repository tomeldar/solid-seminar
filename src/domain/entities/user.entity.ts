import { Entity, EntityProps } from './entity';

export interface UserProps {
  username: string;
  email: string;
}

export interface UserJson {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  email: string;
}

/**
 * UserEntity represents a user in the domain.
 * It extends BaseEntity to inherit common entity behavior (id, timestamps, etc).
 */
export class UserEntity extends Entity {
  username: string;
  email: string;

  constructor(entityProps: EntityProps, props: UserProps) {
    super(entityProps);

    if (!props || !props.username) {
      throw new Error('User requires a username');
    }
    if (!props || !props.email) {
      throw new Error('User requires an email');
    }

    this.username = props.username?.trim() ?? '';
    this.email = props.email.toLowerCase().trim();
  }

  updateEmail(email: string): void {
    if (!email) throw new Error('Email must not be empty');
    this.email = email.toLowerCase().trim();
    this.touch();
  }

  updateUsername(username: string): void {
    if (!username) throw new Error('Username must not be empty');
    this.username = username.trim();
    this.touch();
  }

  toJSON(): UserJson {
    return {
      id: this._id.toString(),
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      username: this.username,
      email: this.email,
    };
  }
}
