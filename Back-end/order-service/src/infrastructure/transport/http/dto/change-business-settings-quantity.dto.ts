import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBusinessSettingsQuantityDto {
  @IsNumber({}, { message: 'El campo quantity debe ser un número' })
  @IsNotEmpty({ message: 'El campo quantity es requerido' })
  quantity: number;
}