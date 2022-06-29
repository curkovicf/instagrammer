import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class RefreshJwtRequestDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsBoolean()
  @IsNotEmpty()
  isLongSession!: boolean;
}
