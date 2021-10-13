import { Exclude, Expose } from 'class-transformer';
import { MaxLength, IsString, IsNumber } from 'class-validator';

@Exclude()
export class ReadRoleDto {
  @Expose({ name: 'identificador' })
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'This name is not valid' })
  readonly name: string;

  @Expose()
  @IsString()
  @MaxLength(100, { message: 'This description is not valid' })
  readonly description: string;
}
