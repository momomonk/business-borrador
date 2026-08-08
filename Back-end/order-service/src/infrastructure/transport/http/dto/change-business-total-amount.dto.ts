import { IsNotEmpty, IsNumber} from 'class-validator';

export class UpdateBusinessTotalAmountDto {
  @IsNumber({}, { message: 'El campo total_amount debe ser un número' })
  @IsNotEmpty({ message: 'El campo total_amount es requerido' })
  total_amount: number;
}