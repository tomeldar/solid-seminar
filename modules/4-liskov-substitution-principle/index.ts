type ValidationResult = { ok: true } | { ok: false; errors: string[] };

class Entity {
  constructor(public readonly id: string) {}

  validate(): ValidationResult {
    return { ok: true };
  }

  serialize(): { id: string; [k: string]: unknown } {
    return { id: this.id };
  }
}

class UserEntity extends Entity {
  constructor(
    id: string,
    public username: string,
  ) {
    super(id);
  }

  validate(): ValidationResult {
    return this.username ? { ok: true } : { ok: false, errors: ['username required'] };
  }

  serialize() {
    return { id: this.id, username: this.username };
  }
}

class OrderEntity extends Entity {
  constructor(
    id: string,
    public totalCents: number,
  ) {
    super(id);
  }

  validate(): ValidationResult {
    if (this.totalCents < 0) throw new Error('negative total');
    return { ok: true };
  }

  serialize() {
    return { id: this.id, totalCents: this.totalCents };
  }
}

const validateEntity = (e: Entity) => e.validate();
const serializeEntity = (e: Entity) => e.serialize();

// Example usage:
const user = new UserEntity('u1', 'alice');
const order = new OrderEntity('o1', 5000);

console.log(validateEntity(user)); // { ok: true }
console.log(serializeEntity(order)); // { id: 'o1', totalCents: 5000 }
