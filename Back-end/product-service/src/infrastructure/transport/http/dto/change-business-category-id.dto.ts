import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBusinessCategoryIdDto {
  @IsString({ message: 'El campo categoryId debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo categoryId es requerido' })
  categoryId: string;
}