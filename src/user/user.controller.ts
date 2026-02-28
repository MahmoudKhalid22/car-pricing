import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateUserDto, UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { FindOneOptions } from 'typeorm';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('register')
  async createUser(@Body() userData: UserDto) {
    await this.userService.create(userData);
  }

  @UseInterceptors(SerializeInterceptor)
  @Get('/users')
  async getAllUsers() {
    return await this.userService.findAll();
  }
  @UseInterceptors(SerializeInterceptor)
  @Get('/:id')
  async getOneUser(@Param('id') id: number) {
    return await this.userService.findOneUser(id);
  }

  @Put(':id')
  async updateUserData(
    @Param('id') id: number,
    @Body() userData: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, userData);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number) {
    await this.userService.removeUser(id);
  }
}
