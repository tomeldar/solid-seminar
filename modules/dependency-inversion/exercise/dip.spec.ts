import { describe, it, expect } from "vitest";
// DIP Violation: High-level service depends on concrete EmailApi directly
class EmailApi {
  send(to: string, body: string) {
    return `sent:${to}`;
  }
}
class WelcomeService {
  constructor(private api: EmailApi) {}
  welcome(userEmail: string) {
    return this.api.send(userEmail, "welcome");
  }
}

describe("DIP exercise", () => {
  it("hard to swap EmailApi without editing WelcomeService", () => {
    const service = new WelcomeService(new EmailApi());
    const result = service.welcome("a@example.com");
    expect(result).toBe("mocked"); // will fail -> encourages inversion via interface + injection
  });
});
