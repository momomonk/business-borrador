import { IsNotEmpty, IsString} from 'class-validator';

export class ChangeBusinessCustomerIdDto {
  @IsString({ message: 'El campo customerId debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo customerId es requerido' })
  customerId: string;
}