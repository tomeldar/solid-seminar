// DIP starter example - high level module tied to concrete
export class EmailApi {
  send(to: string, body: string) {
    return `sent:${to}`;
  }
}
export class WelcomeService {
  constructor(private api: EmailApi) {}
  welcome(userEmail: string) {
    return this.api.send(userEmail, "welcome");
  }
}
