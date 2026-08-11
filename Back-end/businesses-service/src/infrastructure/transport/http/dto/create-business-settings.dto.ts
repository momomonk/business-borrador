import { IsObject, IsNotEmpty } from 'class-validator';

export class CreateBusinessSettingsDto {
  @IsObject()
  @IsNotEmpty()
  themeConfig: Record<string, any>;

  @IsObject()
  @IsNotEmpty()
  domainSettings: Record<string, any>;
}