import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeBusinessSlugDto {
  @IsString({ message: 'El campo slug debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo slug es requerido' })
  slug: string;
}