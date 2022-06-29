import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UsernameExistsRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username!: string;
}
