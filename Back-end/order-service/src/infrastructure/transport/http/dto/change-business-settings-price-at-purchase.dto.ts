import { IsNotEmpty, IsNumber} from 'class-validator';

export class ChangeBusinessSettingsPriceAtPurchaseDto {
  @IsNumber({maxDecimalPlaces: 2}, { message: 'El campo priceAtPurchase debe ser un número' })
  @IsNotEmpty({ message: 'El campo priceAtPurchase es requerido' })
  priceAtPurchase: number;
}