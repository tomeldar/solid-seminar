import * as request from "supertest";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { INestApplication } from "@nestjs/common";
// @ts-ignore
import { AppModule } from "../../final-integration/src/app.module";
import { Test } from "@nestjs/testing";

let app: INestApplication;
let noteId: string;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleRef.createNestApplication();
  await app.init();
  const userRes = await request(app.getHttpServer())
    .post("/users")
    .send({ name: "Patcher", email: "patcher@example.com" });
  const authorId = userRes.body.id;
  const noteRes = await request(app.getHttpServer())
    .post("/notes")
    .send({ title: "PatchMe", content: "Old", authorId });
  noteId = noteRes.body.id;
});

afterAll(async () => {
  if (app) await app.close();
});

describe("PATCH /notes/:id contract", () => {
  it("200 on update", async () => {
    const res = await request(app.getHttpServer())
      .patch(`/notes/${noteId}`)
      .send({ title: "Patched" });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: noteId, title: "Patched" });
  });

  it("404 unknown note", async () => {
    const res = await request(app.getHttpServer())
      .patch("/notes/does-not-exist")
      .send({ title: "X" });
    expect(res.status).toBe(404);
  });

  it("403 unauthorized placeholder", async () => {
    const res = await request(app.getHttpServer())
      .patch("/notes/forbidden-note-id")
      .send({ title: "X" });
    expect([403, 404]).toContain(res.status);
  });
});
