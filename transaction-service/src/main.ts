import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * helmet enabled for security
   */
  app.use(helmet());

  await app.listen(8081);
}
bootstrap();
