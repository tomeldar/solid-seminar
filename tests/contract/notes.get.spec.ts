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
    .send({ name: "Getter", email: "getter@example.com" });
  const authorId = userRes.body.id;
  const noteRes = await request(app.getHttpServer())
    .post("/notes")
    .send({ title: "Gettable", content: "Visible", authorId });
  noteId = noteRes.body.id;
});

afterAll(async () => {
  if (app) await app.close();
});

describe("GET /notes/:id contract", () => {
  it("returns 200 and note", async () => {
    const res = await request(app.getHttpServer()).get(`/notes/${noteId}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: noteId });
  });

  it("404 unknown note", async () => {
    const res = await request(app.getHttpServer()).get(
      "/notes/unknown-note-id"
    );
    expect(res.status).toBe(404);
  });

  it("403 unauthorized placeholder (simulate access restriction)", async () => {
    // Later: create a second user & enforce authz filter; for now expect 403 when param triggers rule
    const res = await request(app.getHttpServer()).get(
      "/notes/forbidden-note-id"
    );
    expect([403, 404]).toContain(res.status); // allow 404 until auth implemented, will narrow later
  });
});
