import { IsString, IsNotEmpty, IsBoolean} from 'class-validator';

export class UpdateBusinessDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}