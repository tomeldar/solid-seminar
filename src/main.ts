import { NestFactory } from '@nestjs/core';
import { UserModuleodule } from './adapters/inbound/http/user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
