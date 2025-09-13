import * as request from "supertest";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { INestApplication } from "@nestjs/common";
// @ts-ignore
import { AppModule } from "../../final-integration/src/app.module";
import { Test } from "@nestjs/testing";

let app: INestApplication;
let authorId: string;
let noteId: string;

beforeAll(async () => {
  const mod = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = mod.createNestApplication();
  await app.init();
  const userRes = await request(app.getHttpServer())
    .post("/users")
    .send({ name: "Author", email: "author2@example.com" });
  authorId = userRes.body.id;
});

afterAll(async () => {
  if (app) await app.close();
});

describe("Integration: note CRUD by author", () => {
  it("creates note", async () => {
    const res = await request(app.getHttpServer())
      .post("/notes")
      .send({ title: "I", content: "C", authorId });
    expect(res.status).toBe(201);
    noteId = res.body.id;
  });
  it("updates note", async () => {
    const res = await request(app.getHttpServer())
      .patch(`/notes/${noteId}`)
      .send({ content: "Changed" });
    expect(res.status).toBe(200);
  });
  it("deletes note", async () => {
    const res = await request(app.getHttpServer()).delete(`/notes/${noteId}`);
    expect(res.status).toBe(204);
  });
});
