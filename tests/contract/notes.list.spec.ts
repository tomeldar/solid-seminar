import * as request from "supertest";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { INestApplication } from "@nestjs/common";
// @ts-ignore
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
    .send({ name: "Lister", email: "lister@example.com" });
  authorId = userRes.body.id;
  await request(app.getHttpServer())
    .post("/notes")
    .send({ title: "A", content: "1", authorId });
  await request(app.getHttpServer())
    .post("/notes")
    .send({ title: "B", content: "2", authorId });
});

afterAll(async () => {
  if (app) await app.close();
});

describe("GET /notes contract", () => {
  it("returns array (200)", async () => {
    const res = await request(app.getHttpServer()).get("/notes");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });
});
