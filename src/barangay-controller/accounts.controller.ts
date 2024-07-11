import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  // UseGuards,
} from '@nestjs/common';
import { AuthLoginDto } from "src/barangay-dto's/auth-login.dto";
import { CreateAccountDto } from "src/barangay-dto's/create-account.dto";
import { UpdateAccountDto } from "src/barangay-dto's/update-account.dto";
// import { JwtAuthGuard } from 'src/barangay-guards/jwt-auth-guards';
import { AccountsService } from 'src/barangay-service/accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('create-account')
  @UsePipes(new ValidationPipe({ transform: true }))
  createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.createAccount(createAccountDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('registered-account')
  findAllRegisteredAccount() {
    return this.accountsService.findAllRegisteredAccount();
  }
  // @UseGuards(JwtAuthGuard)
  @Get('registered-account/:uuid')
  findOneRegisteredAccount(@Param('uuid') uuid: string) {
    return this.accountsService.findOneRegisteredAccount(uuid);
  }
  // @UseGuards(JwtAuthGuard)
  @Patch('update-account/:uuid')
  updateAccount(
    @Param('uuid') uuid: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountsService.updateAccount(uuid, updateAccountDto);
  }
  // @UseGuards(JwtAuthGuard)
  @Delete('delete-account/:uuid')
  removeAccount(@Param('uuid') uuid: string) {
    return this.accountsService.removeAccount(uuid);
  }

  // pra sa authentication ni dri

  @Post('auth-login')
  authLogin(@Body() authLoginDto: AuthLoginDto) {
    return this.accountsService.authLogin(authLoginDto);
  }
}
