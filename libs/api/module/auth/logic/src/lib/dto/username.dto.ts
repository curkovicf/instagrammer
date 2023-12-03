import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UsernameDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username!: string;
}
