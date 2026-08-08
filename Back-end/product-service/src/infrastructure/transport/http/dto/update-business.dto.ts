import { IsString, IsNotEmpty} from 'class-validator';

export class UpdateBusinessDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}