import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Household } from 'src/barangay-entities/household.entity';
import { Inhabitant } from 'src/inhabitant/entities/inhabitant.entity';
import { OtherInhabitant } from 'src/other-inhabitants/entities/other-inhabitant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Household, Inhabitant, OtherInhabitant])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
