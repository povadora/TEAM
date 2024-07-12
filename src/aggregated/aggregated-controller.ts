// src/barangay-controller/aggregated.controller.ts
import { Controller, Get } from '@nestjs/common';
import { HouseholdsService } from 'src/barangay-service/households.service';

@Controller('aggregated')
export class AggregatedController {
  constructor(private readonly householdsService: HouseholdsService) {}

  @Get('data')
  async getAggregatedData() {
    return this.householdsService.getAggregatedData();
  }
}
