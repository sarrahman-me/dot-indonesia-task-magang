import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.model';
import { responseType } from 'src/interfaces/responseType';
import { AuthGuard } from './users.guard';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() payload: Partial<Users>): Promise<responseType> {
    try {
      const data = await this.usersService.register(payload);

      return {
        data,
        metadata: null,
        error: null,
      };
    } catch (error) {
      if (error.response.code == 500) {
        // kirim ke sentry
      }
      return {
        data: null,
        metadata: null,
        error: error.response,
      };
    }
  }

  @Post('login')
  async login(@Body() payload: Partial<Users>): Promise<responseType> {
    try {
      const token = await this.usersService.login(payload);

      return {
        data: {
          token,
        },
        metadata: null,
        error: null,
      };
    } catch (error) {
      if (error.response.code == 500) {
        // kirim ke sentry
      }
      return {
        data: null,
        metadata: null,
        error: error.response,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(
    @Request()
    req: {
      user: {
        email: string;
      };
    },
  ): Promise<responseType> {
    try {
      const data = await this.usersService.find(req.user.email);

      return {
        data,
        metadata: null,
        error: null,
      };
    } catch (error) {
      if (error.response.code == 500) {
        // kirim ke sentry
      }
      return {
        data: null,
        metadata: null,
        error: error.response,
      };
    }
  }
}
