import {IsBoolean, isBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBusinessDto {
  @IsString({ message: 'El campo businessId debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo businessId es requerido' })
  businessId: string;

  @IsString({ message: 'El campo customerId debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo customerId es requerido' })
  customerId: string;

  @IsNumber({maxDecimalPlaces: 2}, { message: 'El campo totalAmount debe ser un número' })
  @IsNotEmpty({ message: 'El campo totalAmount es requerido' })
  totalAmount: number;

  @IsBoolean({ message: 'El campo status debe ser un valor booleano' })
  @IsNotEmpty({ message: 'El campo status es requerido' })
  status: boolean;
}