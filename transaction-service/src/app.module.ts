import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TransactionModule } from './transaction/transaction.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    /**
     * module configuration .env
     */
    ConfigModule.forRoot(),

    /**
     * JWT config
     */
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),

    /**
     * ORM mongoose
     */
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST}:27017/payment-service`,
    ),

    /**
     * setting queue routes on rabbitmq
     */
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_HOST],
          queue: 'users_service',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),

    /**
     * rate limiter
     */
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute (60000 milliseconds)
        limit: 60, // 60 requests per ttl (1 minute)
      },
    ]),

    /**
     * other modules
     */
    TransactionModule,
  ],
  providers: [
    /**
     * global rate limiter configuration
     */
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
