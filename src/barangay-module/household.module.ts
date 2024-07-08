import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HouseholdController } from 'src/barangay-controller/housholds.controller';
import { Household } from 'src/barangay-entities/household.entity';
import { HouseholdsService } from 'src/barangay-service/households.service';
import { Inhabitant } from 'src/inhabitant/entities/inhabitant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Household, Inhabitant]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [HouseholdController],
  providers: [HouseholdsService],
})
export class HouseholdModule {}
