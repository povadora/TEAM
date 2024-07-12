import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './barangay-entities/account.entity';
import { AccountsModule } from './barangay-module/accounts.module';
import { HouseholdModule } from './barangay-module/household.module';
import { Household } from './barangay-entities/household.entity';
import { ConfigModule } from '@nestjs/config';
import { InhabitantModule } from './inhabitant/inhabitant.module';
import { Inhabitant } from './inhabitant/entities/inhabitant.entity';
import { OtherInhabitantsModule } from './other-inhabitants/other-inhabitants.module';
import { OtherInhabitant } from './other-inhabitants/entities/other-inhabitant.entity';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'bms',
      password: 'bms123',
      database: 'barangay_db',
      entities: [Account, Household, Inhabitant, OtherInhabitant],
      synchronize: true,
    }),
    AccountsModule,
    HouseholdModule,
    InhabitantModule,
    OtherInhabitantsModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
