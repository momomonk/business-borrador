import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBusinessAttributesDto {
  @IsString({ message: 'El campo attributes debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo attributes es requerido' })
  attributes: Record<string, any>;
}