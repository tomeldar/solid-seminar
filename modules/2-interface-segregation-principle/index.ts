interface IFeatureFlagManager {
  isEnabled(key: string): boolean;
  getAllFlags(): Record<string, boolean>;
  updateFlag(key: string, value: boolean): void;
}

class EnvFeatureFlags implements IFeatureFlagManager {
  private _env: Record<string, string> = {};

  constructor(env: Record<string, string | undefined>) {
    Object.keys(env).forEach((key) => {
      if (env[key] === undefined) return;
      this._env[key] = env[key];
    });
  }

  isEnabled(flagName: string) {
    return this._env[flagName] === 'true';
  }

  getAllFlags(): Record<string, boolean> {
    throw new Error('Not supported with environment vars');
  }

  updateFlag() {
    throw new Error('Not supported with environment vars');
  }
}

class CheckoutFlow {
  constructor(private flags: IFeatureFlagManager) {}
  start() {
    if (this.flags.isEnabled('new-checkout')) {
      console.log('Running new checkout');
      const errorWithCheckout = Math.random() < 0.5;
      if (errorWithCheckout) {
        console.log('Error occurred with new checkout. Reverting to old checkout');
        this.flags.updateFlag('new-checkout', false);
        this.start();
      }
    } else {
      console.log('Running old checkout');
    }
  }
}

const flow = new CheckoutFlow(new EnvFeatureFlags(process.env));
flow.start();
