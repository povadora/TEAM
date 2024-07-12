import { Module, forwardRef } from '@nestjs/common';
import { AggregatedDataGateway } from './aggregated-data.gateway';
import { HouseholdModule } from 'src/barangay-module/household.module';

@Module({
  imports: [forwardRef(() => HouseholdModule)],
  providers: [AggregatedDataGateway],
  exports: [AggregatedDataGateway],
})
export class AggregatedModule {}
