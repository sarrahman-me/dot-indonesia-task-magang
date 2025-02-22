import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Set global prefix for all routes
   */
  app.setGlobalPrefix('users');

  /**
   * helmet enabled for security
   */
  app.use(helmet());

  /**
   * Cek koneksi ke rabbitmq
   */
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_HOST],
      queue: 'users_service',
      queueOptions: {
        durable: true,
      },
    },
  });

  /**
   * Start REST API server
   */
  await app.listen(8080);

  /**
   * Start consuming messages from RabbitMQ
   */
  await app.startAllMicroservices();
}
bootstrap();
