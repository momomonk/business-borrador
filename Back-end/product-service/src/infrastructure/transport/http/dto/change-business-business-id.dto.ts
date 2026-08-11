import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBusinessBusinessIdDto {
  @IsString({ message: 'El campo businessId debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo businessId es requerido' })
  businessId: string;
}