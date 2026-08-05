import { IsString, IsNotEmpty} from 'class-validator';

export class UpdateBusinessSettingsDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}