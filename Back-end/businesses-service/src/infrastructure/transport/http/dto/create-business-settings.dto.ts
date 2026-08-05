import { IsString, IsNotEmpty} from 'class-validator';

export class CreateBusinessSettingsDto {
  @IsString()
  @IsNotEmpty()
  businessSettingsId: string;
}