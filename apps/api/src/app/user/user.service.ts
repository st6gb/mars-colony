import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserDto) private readonly userRepository: Repository<UserDto>,
  ) {}

  async findAll(): Promise<UserDto[]>  {
    return this.userRepository.find();
  }

  async setUser(user: UserDto): Promise<UserDto> {
    console.log(user);
    return this.userRepository.save(user);
  }
}
