import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateBusinessDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;
}