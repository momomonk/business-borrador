import { IsNotEmpty, IsObject} from 'class-validator';

export class ChangeBusinessSettingsThemeConfigDto {
  @IsObject({ message: 'El campo themeConfig debe ser un objeto' })
  @IsNotEmpty({ message: 'El campo themeConfig es requerido' })
  themeConfig: Record<string, any>;
}