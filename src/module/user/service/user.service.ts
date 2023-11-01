import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    //check if username already exist
    let user = await this.usersRepository.findOneBy({
      username: createUserDto.username,
    });

    if (user) {
      throw new HttpException('User already exist', HttpStatus.NOT_ACCEPTABLE);
    }

    try {
      return this.usersRepository.save(createUserDto);
    } catch (error) {
      throw new HttpException('Invalid user', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async findOne(id: number) {
    let user = this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
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
    return user.password;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    //check if user exist
    if ((await this.findOne(id)) == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    try {
      return this.usersRepository.update(id, updateUserDto);
    } catch (error) {
      throw new HttpException('Invalid user', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async remove(id: number): Promise<boolean> {
    if (this.findOne(id) == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    let res = await this.usersRepository.delete(id);
    return res.affected > 0;
  }
}
