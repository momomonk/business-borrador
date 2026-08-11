import { IsNotEmpty, IsString} from 'class-validator';

export class ChangeBusinessSettingsProductIdDto {
  @IsString({ message: 'El campo productId debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo productId es requerido' })
  productId: string;
}