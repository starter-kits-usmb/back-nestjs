import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  async getPasswordHash(id: number) {
    let user = await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.id', 'id')
      .addSelect('user.password')
      .where('id = :id', { id: id })
      .getOne();
    console.log('user.password', user);
    return user.password;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
