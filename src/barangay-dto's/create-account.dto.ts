import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { accountRole } from 'src/barangay-entities/account.entity';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(accountRole)
  role: accountRole;
}
