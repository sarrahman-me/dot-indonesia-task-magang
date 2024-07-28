import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UsersModule } from '../src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../src/users/users.model';
import { PaymentAccount } from '../src/payment-account/payment_account.model';
import { UsersService } from '../src/users/users.service';

describe('Users', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let token: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
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
         * Other module
         */
        UsersModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it(`POST Pendaftaran pengguna baru`, async () => {
    const expectedResult = {
      data: {
        name: 'testuser',
        email: 'testuser@example.com',
        // lainnya bisa saja berbeda
      },
      metadata: null,
      error: null,
    };

    const response = await request(app.getHttpServer()).post('/register').send({
      name: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(expectedResult);
  });

  it(`POST Pengguna login`, async () => {
    // const expectedResult = {
    //   data: {
    //     token: '...',
    //   },
    //   metadata: null,
    //   error: null,
    // };

    const response = await request(app.getHttpServer()).post('/login').send({
      email: 'testuser@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data.token');
    expect(typeof response.body.data.token).toBe('string');

    token = response.body.data.token;
  });

  it(`GET Mengakses data pengguna yang sedang login`, async () => {
    const expectedResult = {
      data: {
        name: 'testuser',
        email: 'testuser@example.com',
        payment_account: {
          pic: 'TESTUSER',
          balance: '0.00',
          email: 'testuser@example.com',
        },
      },
      metadata: null,
      error: null,
    };

    const response = await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expectedResult);
  });

  afterAll(async () => {
    await usersService.removeUserData('testuser@example.com');
    await app.close();
  });
});
