import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class RefreshJwtDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsBoolean()
  @IsNotEmpty()
  isLongSession!: boolean;
}
