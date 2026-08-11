import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBusinessSettingsParentIdDto {
  @IsString({ message: 'El campo parentId debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo parentId es requerido' })
  parentId: string;
}