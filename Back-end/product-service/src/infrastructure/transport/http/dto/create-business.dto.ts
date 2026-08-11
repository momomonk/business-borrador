import { IsString, IsNotEmpty, IsDate, IsNumber, IsObject } from 'class-validator';

export class CreateBusinessDto {
  @IsString()
  @IsNotEmpty()
  businessId: string;
  
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsObject()
  @IsNotEmpty()
  attributes: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  description: string;
  
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El campo price debe ser un número con un máximo de 2 decimales' }
  )
  @IsNotEmpty({ message: 'El campo price es requerido' })
  price: number;
}