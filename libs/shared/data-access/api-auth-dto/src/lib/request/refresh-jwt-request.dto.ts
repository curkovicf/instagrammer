import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class RefreshJwtRequestDto {
  @IsNotEmpty()
  @IsString()
  usernameOrEmail!: string;

  @IsBoolean()
  @IsNotEmpty()
  isLongSession!: boolean;
}
