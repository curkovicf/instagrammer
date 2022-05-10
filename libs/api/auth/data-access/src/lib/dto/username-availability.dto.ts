import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UsernameAvailabilityDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  username!: string;
}
