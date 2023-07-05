import { IsDefined, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsDefined()
  public caption!: string;
}
