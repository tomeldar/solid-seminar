// T043: Application bootstrap
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["log", "error", "warn"],
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Bootstrap failed", err);
  process.exit(1);
});
