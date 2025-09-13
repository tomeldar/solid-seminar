import * as request from "supertest";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { INestApplication } from "@nestjs/common";
// @ts-ignore - AppModule not yet implemented
import { AppModule } from "../../final-integration/src/app.module";
import { Test } from "@nestjs/testing";

let app: INestApplication;
let createdId: string;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleRef.createNestApplication();
  await app.init();
  const createRes = await request(app.getHttpServer())
    .post("/users")
    .send({ name: "Bob", email: "bob@example.com" });
  createdId = createRes.body.id;
});

afterAll(async () => {
  if (app) await app.close();
});

describe("GET /users/:id contract", () => {
  it("returns 200 and user body", async () => {
    const res = await request(app.getHttpServer()).get(`/users/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: createdId, email: "bob@example.com" });
  });

  it("returns 404 for unknown id", async () => {
    const res = await request(app.getHttpServer()).get("/users/unknown-id");
    expect(res.status).toBe(404);
  });
});
