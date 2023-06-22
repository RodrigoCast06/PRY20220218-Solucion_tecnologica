import { Body, Controller, Get, Post } from '@nestjs/common';
import { BaseController } from 'src/base';
import { User } from './user.entityt';
import { UserService } from './user.service';
import { Login } from './dto/login.dto';

@Controller('user')
export class UserController extends BaseController<User> {
  constructor(private userService: UserService) {
    super(userService);
  }

  @Post('login')
  async isRegistered(@Body() dto: Login) {
    const data = this.userService.login(dto);
    return data;
  }
}
