import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  username: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
}
export class UpdateUserDto {
  @IsString()
  username: string;
  @IsEmail()
  email: string;
}
