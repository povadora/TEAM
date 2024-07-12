import { Module } from '@nestjs/common';
import { InhabitantService } from './inhabitant.service';
import { InhabitantController } from './inhabitant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inhabitant } from './entities/inhabitant.entity';
import { MulterModule } from '@nestjs/platform-express';
import { Household } from 'src/barangay-entities/household.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inhabitant, Household]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [InhabitantController],
  providers: [InhabitantService],
})
export class InhabitantModule {}
