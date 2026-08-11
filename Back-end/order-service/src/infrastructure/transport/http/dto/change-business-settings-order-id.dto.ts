import { IsNotEmpty, IsString} from 'class-validator';

export class ChangeBusinessSettingsOrderIdDto {
  @IsString({ message: 'El campo orderId debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo orderId es requerido' })
  orderId: string;
}