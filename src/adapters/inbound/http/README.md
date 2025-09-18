# Inbound adapters

Inbound adapters are the entry points into your application (for example: HTTP controllers, message-queue listeners, gRPC controllers). They translate external requests into calls to your application’s use cases.

Key points

- Examples: HTTP controllers, message queue listeners, gRPC controllers, CLI handlers, etc.
- Dependency rule: adapters should depend only on application services (use cases) and not on other infrastructure or framework-specific internals.
- Responsibility: validate/parse input, call use-case services, translate results or errors back to the external format.

Example (this repository)

- An HTTP `UserController` handles incoming requests.
- A NestJS module wires dependencies and performs dependency injection for the `UserService`, keeping the controller dependent on application-level services only.
