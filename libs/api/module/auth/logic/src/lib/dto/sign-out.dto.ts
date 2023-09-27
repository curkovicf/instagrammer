import { IsNotEmpty, IsString } from 'class-validator';

export class SignOutDto {
  @IsString()
  @IsNotEmpty()
  usernameOrEmail!: string;
}
