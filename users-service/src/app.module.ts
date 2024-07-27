import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Users } from './users/users.model';
import { APP_GUARD } from '@nestjs/core';
import { PaymentAccountModule } from './payment-account/payment_account.module';
import { PaymentAccount } from './payment-account/payment_account.model';

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
     * ORM Sequelize
     */
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: 'finance',
      models: [Users, PaymentAccount],
      autoLoadModels: true,
    }),

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
    UsersModule,
    PaymentAccountModule,
  ],
  providers: [
    /**
     * global rate limiter configuration
     */
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
