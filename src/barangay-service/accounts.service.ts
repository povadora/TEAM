import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/barangay-entities/account.entity';
import { CreateAccountDto } from "src/barangay-dto's/create-account.dto";
import { UpdateAccountDto } from "src/barangay-dto's/update-account.dto";
import { AuthLoginDto } from "src/barangay-dto's/auth-login.dto";

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
    const { userName, password, firstName, lastName, role } = createAccountDto;
    console.log('CreateAccountDto:', createAccountDto);
    console.log('Password:', password);

    if (!password) {
      throw new Error('Password is required');
    }

    const hash = await argon.hash(password);
    const newAccount = this.accountRepository.create({
      userName,
      hash,
      firstName,
      lastName,
      role,
    });

    return await this.accountRepository.save(newAccount);
  }

  async findAllRegisteredAccount(): Promise<Account[]> {
    return await this.accountRepository.find();
  }

  async findOneRegisteredAccount(accountUuid: string): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { accountUuid },
    });
    if (!account) {
      throw new NotFoundException(`Account with ID ${accountUuid} not found`);
    }
    return account;
  }

  async updateAccount(
    accountUuid: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { accountUuid },
    });
    if (!account) {
      throw new NotFoundException(`Account with ID ${accountUuid} not found`);
    }

    const updateData: any = { ...updateAccountDto };

    if (updateAccountDto.password) {
      updateData.hash = await argon.hash(updateAccountDto.password);
      delete updateData.password;
    }

    try {
      await this.accountRepository.update({ accountUuid }, updateData);
      return this.accountRepository.findOne({ where: { accountUuid } });
    } catch (error) {
      console.error('Error updating account:', error);
      throw error;
    }
  }

  async removeAccount(accountUuid: string): Promise<void> {
    const result = await this.accountRepository.delete({ accountUuid });
    if (result.affected === 0) {
      throw new NotFoundException(`Account with ID ${accountUuid} not found`);
    }
  }

  async authLogin(
    authLoginDto: AuthLoginDto,
  ): Promise<{ access_token: string }> {
    const { userName, password } = authLoginDto;
    const accounstData = await this.accountRepository.findOne({
      where: { userName },
    });
    if (!accounstData) {
      throw new NotFoundException(
        `Usernamme with username ${userName} not found`,
      );
    }

    const passwordMatches = await argon.verify(accounstData.hash, password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      userName: accounstData.userName,
      sub: accounstData.accountId,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
