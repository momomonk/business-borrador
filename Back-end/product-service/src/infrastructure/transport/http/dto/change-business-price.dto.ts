import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBusinessPriceDto {
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El campo price debe ser un número con un máximo de 2 decimales' }
  )
  @IsNotEmpty({ message: 'El campo price es requerido' })
  price: number;
}