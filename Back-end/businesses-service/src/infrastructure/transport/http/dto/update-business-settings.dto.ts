import { IsString, IsNotEmpty} from 'class-validator';

export class UpdateBusinessSettingsDto {
  @IsString()
  @IsNotEmpty()
  themeConfig: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  domainSettings: Record<string, any>;
}