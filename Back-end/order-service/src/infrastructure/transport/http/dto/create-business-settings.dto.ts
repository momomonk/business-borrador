import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateBusinessSettingsDto {

  @IsString({ message: 'El campo orderId debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo orderId es requerido' })
  orderId: string;

  @IsString({ message: 'El campo productId debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo productId es requerido' })
  productId: string;

  @IsNumber({}, { message: 'El campo quantity debe ser un número' })
  @IsNotEmpty({ message: 'El campo quantity es requerido' })
  quantity: number;

  @IsNumber({maxDecimalPlaces: 2}, { message: 'El campo priceAtPurchase debe ser un número' })
  @IsNotEmpty({ message: 'El campo priceAtPurchase es requerido' })
  priceAtPurchase: number;
}