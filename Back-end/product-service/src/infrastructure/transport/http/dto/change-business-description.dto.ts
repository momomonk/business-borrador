import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBusinessDescriptionDto {
  @IsString({ message: 'El campo description debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo description es requerido' })
  description: string;
}