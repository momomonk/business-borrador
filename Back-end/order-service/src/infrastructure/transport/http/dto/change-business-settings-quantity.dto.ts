import { IsNotEmpty, IsNumber} from 'class-validator';

export class ChangeBusinessSettingsQuantityDto {
  @IsNumber({}, { message: 'El campo quantity debe ser un número' })
  @IsNotEmpty({ message: 'El campo quantity es requerido' })
  quantity: number;
}