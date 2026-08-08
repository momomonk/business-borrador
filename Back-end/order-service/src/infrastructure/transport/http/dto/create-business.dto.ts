import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateBusinessDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}