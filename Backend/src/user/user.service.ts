import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base';
import { Repository } from 'typeorm';
import { User } from './user.entityt';
import { Login } from './dto/login.dto';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private userService: Repository<User>,
  ) {
    super(userService);
  }

  async login(dto: Login) {
    const user = await this.userService.findOne({
      where: {
        email: dto.email,
        password: dto.password,
      },
    });

    if (!user)
      throw new NotFoundException('User does not exists or unauthorized');

    return user;
  }
}
