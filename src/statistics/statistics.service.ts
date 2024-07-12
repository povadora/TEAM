import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Household } from 'src/barangay-entities/household.entity';
import { Between, Repository } from 'typeorm';
import { Inhabitant } from 'src/inhabitant/entities/inhabitant.entity';
import { OtherInhabitant } from 'src/other-inhabitants/entities/other-inhabitant.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Household)
    private readonly householdRepository: Repository<Household>,
    @InjectRepository(Inhabitant)
    private readonly inhabitantRepository: Repository<Inhabitant>,
    @InjectRepository(OtherInhabitant)
    private readonly otherInhabitantRepository: Repository<OtherInhabitant>,
  ) {}

  async getStatistics(year: number = new Date().getFullYear()): Promise<any> {
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year + 1, 0, 1);

    const totalHouseholds = await this.householdRepository.count();
    const totalInhabitants = await this.inhabitantRepository.count();
    const totalOtherInhabitants = await this.otherInhabitantRepository.count();
    const totalOtherInhabitantVoters =
      await this.otherInhabitantRepository.count({
        where: { isRegisteredVoter: true },
      });
    const totalVoters = await this.inhabitantRepository.count({
      where: { isRegisteredVoter: true },
    });
    const totalOtherInhabitantNonVoters =
      totalOtherInhabitants - totalOtherInhabitantVoters;
    const totalNonVoters = totalInhabitants - totalVoters;

    const totalNewHouseholds = await this.householdRepository.count({
      where: {
        createdAt: Between(startOfYear, endOfYear),
      },
    });

    const totalNewInhabitants = await this.inhabitantRepository.count({
      where: {
        createdAt: Between(startOfYear, endOfYear),
      },
    });

    const totalNewOtherInhabitants = await this.otherInhabitantRepository.count(
      { where: { createdAt: Between(startOfYear, endOfYear) } },
    );

    return {
      totalHouseholds,
      totalInhabitants,
      totalOtherInhabitants,
      totalOtherInhabitantVoters,
      totalOtherInhabitantNonVoters,
      totalVoters,
      totalNonVoters,
      totalNewHouseholds,
      totalNewInhabitants,
      totalNewOtherInhabitants,
    };
  }
}
