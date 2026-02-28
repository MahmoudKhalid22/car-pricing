import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(userData: { username: string; email: string; password: string }) {
    const { username, email, password } = userData;

    const user = this.repo.create({ username, email, password });
    this.repo.save(user);
  }
}
