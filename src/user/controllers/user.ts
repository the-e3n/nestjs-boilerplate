import { Request, Response, RestController, WithAlias } from '@libs/core';
import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from '../services';
import { UserDetailTransformer } from '@app/transformer';

@Controller('users')
export class UserController extends RestController {
  constructor(private users: UserService) {
    super();
  }

  @Get()
  @WithAlias('auth.profile')
  async getProfile(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.users.get(req.all());
    return res.success(user);
  }

  @Post()
  async createUser(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.users.create(req.all());
    return res.success('');
  }
}
