import { Module } from '@nestjs/common';
import { OtherInhabitantsService } from './other-inhabitants.service';
import { OtherInhabitantsController } from './other-inhabitants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtherInhabitant } from './entities/other-inhabitant.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([OtherInhabitant]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [OtherInhabitantsController],
  providers: [OtherInhabitantsService],
})
export class OtherInhabitantsModule {}
