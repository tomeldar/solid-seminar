import * as request from "supertest";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { INestApplication } from "@nestjs/common";
// NOTE: AppModule not implemented yet; this test is expected to fail initially (RED phase)
// Once T039–T043 complete, these tests should exercise the real HTTP stack.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AppModule } from "../../final-integration/src/app.module";
import { Test } from "@nestjs/testing";

let app: INestApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleRef.createNestApplication();
  await app.init();
});

afterAll(async () => {
  if (app) await app.close();
});

describe("POST /users contract", () => {
  it("creates a user (201) with expected shape", async () => {
    const res = await request(app.getHttpServer())
      .post("/users")
      .send({ name: "Alice", email: "alice@example.com" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(String),
      name: "Alice",
      email: "alice@example.com",
    });
  });

  it("400 on invalid payload", async () => {
    const res = await request(app.getHttpServer())
      .post("/users")
      .send({ email: "missing-name@example.com" });
    expect(res.status).toBe(400);
  });
});
