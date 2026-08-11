import { IsNotEmpty, IsNumber} from 'class-validator';

export class ChangeBusinessTotalAmountDto {
  @IsNumber({maxDecimalPlaces: 2}, { message: 'El campo totalAmount debe ser un número' })
  @IsNotEmpty({ message: 'El campo totalAmount es requerido' })
  totalAmount: number;
}