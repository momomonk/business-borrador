import { IsBoolean, IsNotEmpty} from 'class-validator';

export class ChangeBusinessStatusDto {
  @IsBoolean({ message: 'El campo status debe ser un valor booleano' })
  @IsNotEmpty({ message: 'El campo status es requerido' })
  status: boolean;
}