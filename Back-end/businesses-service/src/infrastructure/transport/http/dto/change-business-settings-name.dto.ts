import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNameDto {
  @IsString({ message: 'El campo name debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo name es requerido' })
  name: string;
}