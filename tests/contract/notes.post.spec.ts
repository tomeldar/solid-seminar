import * as request from "supertest";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { INestApplication } from "@nestjs/common";
// @ts-ignore - AppModule placeholder
import { AppModule } from "../../final-integration/src/app.module";
import { Test } from "@nestjs/testing";

let app: INestApplication;
let authorId: string;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleRef.createNestApplication();
  await app.init();
  const userRes = await request(app.getHttpServer())
    .post("/users")
    .send({ name: "Note Author", email: "author@example.com" });
  authorId = userRes.body.id;
});

afterAll(async () => {
  if (app) await app.close();
});

describe("POST /notes contract", () => {
  it("creates note (201) with expected shape", async () => {
    const res = await request(app.getHttpServer())
      .post("/notes")
      .send({ title: "First", content: "Hello", authorId });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(String),
      title: "First",
      authorId,
    });
  });

  it("400 invalid payload", async () => {
    const res = await request(app.getHttpServer())
      .post("/notes")
      .send({ content: "Missing title", authorId });
    expect(res.status).toBe(400);
  });

  it("404 unknown author", async () => {
    const res = await request(app.getHttpServer())
      .post("/notes")
      .send({ title: "Bad", content: "No author", authorId: "does-not-exist" });
    expect(res.status).toBe(404);
  });
});
