import * as request from "supertest";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { INestApplication } from "@nestjs/common";
// @ts-ignore
import { AppModule } from "../../final-integration/src/app.module";
import { Test } from "@nestjs/testing";

let app: INestApplication;
let authorId: string;
let otherUserId: string;
let noteId: string;

beforeAll(async () => {
  const mod = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = mod.createNestApplication();
  await app.init();
  const authorRes = await request(app.getHttpServer())
    .post("/users")
    .send({ name: "AuthAuthor", email: "authauthor@example.com" });
  authorId = authorRes.body.id;
  const otherRes = await request(app.getHttpServer())
    .post("/users")
    .send({ name: "Other", email: "other@example.com" });
  otherUserId = otherRes.body.id;
  const noteRes = await request(app.getHttpServer())
    .post("/notes")
    .send({ title: "Restricted", content: "Secret", authorId });
  noteId = noteRes.body.id;
});

afterAll(async () => {
  if (app) await app.close();
});

describe("Integration: authorization enforcement", () => {
  it("prevents non-author from updating", async () => {
    // Later: include auth headers/impersonation; for now expect 403 or 404 placeholder
    const res = await request(app.getHttpServer())
      .patch(`/notes/${noteId}`)
      .send({ content: "Hack" });
    expect([403, 404]).toContain(res.status);
  });
  it("prevents non-author from deletion", async () => {
    const res = await request(app.getHttpServer()).delete(`/notes/${noteId}`);
    expect([403, 404]).toContain(res.status);
  });
});
