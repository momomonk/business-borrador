import { IsNotEmpty, IsNumber} from 'class-validator';

export class UpdateBusinessStockDto {
  @IsNumber({}, { message: 'El campo stock debe ser un número' })
  @IsNotEmpty({ message: 'El campo stock es requerido' })
  stock: number;
}