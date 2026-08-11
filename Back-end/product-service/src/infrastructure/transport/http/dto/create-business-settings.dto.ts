import { IsString, IsNotEmpty, IsDate} from 'class-validator';

export class CreateBusinessSettingsDto {
  @IsString()
  @IsNotEmpty()
  businessId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  parentId: string;
}