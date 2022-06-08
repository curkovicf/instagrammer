import { IsBoolean, IsNotEmpty } from 'class-validator';

export class BaseCredentialsDto {
  @IsBoolean()
  @IsNotEmpty()
  isLongSession!: boolean;
}
