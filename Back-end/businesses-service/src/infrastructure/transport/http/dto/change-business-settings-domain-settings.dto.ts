import { IsNotEmpty, IsObject} from 'class-validator';

export class ChangeBusinessSettingsDomainSettingsDto {
  @IsObject({ message: 'El campo domainSettings debe ser un objeto' })
  @IsNotEmpty({ message: 'El campo domainSettings es requerido' })
  domainSettings: Record<string, any>;
}