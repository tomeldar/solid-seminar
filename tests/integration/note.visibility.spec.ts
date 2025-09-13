import * as request from "supertest";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { INestApplication } from "@nestjs/common";
// @ts-ignore
import { AppModule } from "../../final-integration/src/app.module";
import { Test } from "@nestjs/testing";

let app: INestApplication;
let authorId: string;

beforeAll(async () => {
  const mod = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = mod.createNestApplication();
  await app.init();
  const userRes = await request(app.getHttpServer())
    .post("/users")
    .send({ name: "VisUser", email: "vis@example.com" });
  authorId = userRes.body.id;
  await request(app.getHttpServer())
    .post("/notes")
    .send({ title: "Visible1", content: "A", authorId });
  await request(app.getHttpServer())
    .post("/notes")
    .send({ title: "Visible2", content: "B", authorId });
});

afterAll(async () => {
  if (app) await app.close();
});

describe("Integration: list visibility", () => {
  it("lists notes (baseline)", async () => {
    const res = await request(app.getHttpServer()).get("/notes");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it("filters by future visibility rule placeholder", async () => {
    // When implementing roles/visibility add query parameter tests
    const res = await request(app.getHttpServer()).get(
      "/notes?authorOnly=true"
    );
    expect(res.status).toBe(200);
  });
});
