import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

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
  @IsOptional()
  username: string;
  @IsEmail()
  @IsOptional()
  email: string;
}
