import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepositories } from './users.repositories';
import { Users } from './users.model';
import { isEmail } from 'validator';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PaymentAccountService } from 'src/payment-account/payment_account.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepositories: UsersRepositories,
    private readonly paymentAccountService: PaymentAccountService,
    private readonly jwt: JwtService,
  ) {}

  async register(payload: Partial<Users>): Promise<Users> {
    const errorField: Record<string, string> = {};

    if (!payload.name) {
      errorField['name'] = 'Nama harus diisi';
    }

    if (!payload.email) {
      errorField['email'] = 'Email harus diisi';
    }

    if (!payload.password) {
      errorField['password'] = 'Password harus diisi';
    }

    if (Object.keys(errorField).length > 0) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: 'Data tidak lengkap',
          detail: null,
          field: errorField,
          help: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!isEmail(payload.email)) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: 'Format email tidak valid',
          detail: null,
          field: {
            email: 'Format email tidak valid',
          },
          help: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingUser = await this.usersRepositories.find(payload.email);

    if (existingUser) {
      throw new HttpException(
        {
          code: HttpStatus.CONFLICT,
          message: 'Akun sudah pernah terdaftar',
          detail: null,
          field: {
            email: 'Gunakan email yang berbeda',
          },
          help: null,
        },
        HttpStatus.CONFLICT,
      );
    }

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(payload.password, salt);

    const newUser: Partial<Users> = {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    };

    const data = await this.usersRepositories.add(newUser);

    try {
      this.paymentAccountService.create({
        pic: payload.name,
        email: payload.email,
      });
    } catch (error) {
      throw error;
    }

    return data;
  }

  async login(payload: Partial<Users>): Promise<string> {
    const errorField: Record<string, string> = {};

    if (!payload.email) {
      errorField['email'] = 'Email harus diiisi';
    }

    if (!payload.password) {
      errorField['password'] = 'Password harus diiisi';
    }

    if (Object.keys(errorField).length > 0) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: 'Data tidak lengkap',
          detail: null,
          field: errorField,
          help: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingData = await this.usersRepositories.find(payload.email);

    if (!existingData) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: 'Akun tidak ditemukan',
          detail: null,
          field: {
            email: 'gunakan akun yang berbeda',
          },
          help: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordMatch = await bcrypt.compare(
      payload.password,
      existingData.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: 'Kombinasi email dan password tidak sesuai',
          detail: null,
          field: null,
          help: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const claims = {
      email: payload.email,
    };

    return this.jwt.signAsync(claims, {
      expiresIn: '1 days',
    });
  }

  async find(email: string): Promise<Users> {
    const data = await this.usersRepositories.find(email);

    if (!data) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          message: 'Akun tidak ditemukan',
          detail: null,
          field: {
            email: 'gunakan akun yang berbeda',
          },
          help: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return data;
  }
}
