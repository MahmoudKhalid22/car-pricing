import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async create(userData: {
    username: string;
    email: string;
    password: string;
  }) {
    const { username, email, password } = userData;

    const isExist = await this.repo.findOne({ where: { email } });
    if (isExist) throw new BadRequestException('email is already exist');
    try {
      const user = this.repo.create({ username, email, password });
      return await this.repo.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while creating the user.',
      );
    }
  }

  async findAll() {
    const users = await this.repo.find({});
    const filteredUsers = users.map(({ password, ...rest }) => rest);
    return filteredUsers;
  }

  async findOneUser(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('user is not found!');
    const { password, ...data } = user;
    return data;
  }

  async updateUser(id: number, userData: Partial<User>) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('user is not found!');
    Object.assign(user, userData);
    console.log('user: ', user);
    return this.repo.save(user);
  }

  async removeUser(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    console.log('user: ', user);
    if (!user) throw new NotFoundException('user is not found!');
    return this.repo.remove(user);
  }
}
