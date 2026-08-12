import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Post()
  async setUser(@Body() user: UserDto): Promise<UserDto> {
    try {
      const userDto = await this.userService.setUser(user);
      return userDto;
    } catch(error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
