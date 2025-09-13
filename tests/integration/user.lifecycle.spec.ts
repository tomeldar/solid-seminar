import * as request from "supertest";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { INestApplication } from "@nestjs/common";
// @ts-ignore
import { AppModule } from "../../final-integration/src/app.module";
import { Test } from "@nestjs/testing";

let app: INestApplication;
let userId: string;

beforeAll(async () => {
  const mod = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = mod.createNestApplication();
  await app.init();
});

afterAll(async () => {
  if (app) await app.close();
});

describe("Integration: user lifecycle", () => {
  it("creates a user", async () => {
    const res = await request(app.getHttpServer())
      .post("/users")
      .send({ name: "Lifecycle", email: "life@example.com" });
    expect(res.status).toBe(201);
    userId = res.body.id;
  });

  it("fetches created user", async () => {
    const res = await request(app.getHttpServer()).get(`/users/${userId}`);
    expect(res.status).toBe(200);
  });
});
