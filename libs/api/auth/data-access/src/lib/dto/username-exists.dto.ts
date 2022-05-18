import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UsernameExistsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username!: string;
}
