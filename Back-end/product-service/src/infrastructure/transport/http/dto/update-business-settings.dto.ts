import { IsString, IsNotEmpty} from 'class-validator';

export class UpdateBusinessSettingsDto {
  @IsString()
  @IsNotEmpty()
  businessId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  parentId: string;

}