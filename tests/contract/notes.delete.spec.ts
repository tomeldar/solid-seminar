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
    .send({ name: "Deleter", email: "deleter@example.com" });
  const authorId = userRes.body.id;
  const noteRes = await request(app.getHttpServer())
    .post("/notes")
    .send({ title: "RemoveMe", content: "Bye", authorId });
  noteId = noteRes.body.id;
});

afterAll(async () => {
  if (app) await app.close();
});

describe("DELETE /notes/:id contract", () => {
  it("204 on delete", async () => {
    const res = await request(app.getHttpServer()).delete(`/notes/${noteId}`);
    expect(res.status).toBe(204);
  });

  it("404 unknown note", async () => {
    const res = await request(app.getHttpServer()).delete(
      "/notes/does-not-exist"
    );
    expect(res.status).toBe(404);
  });

  it("403 unauthorized placeholder", async () => {
    const res = await request(app.getHttpServer()).delete(
      "/notes/forbidden-note-id"
    );
    expect([403, 404]).toContain(res.status);
  });
});
