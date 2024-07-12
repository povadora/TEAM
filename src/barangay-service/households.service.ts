import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHouseholdDto } from "src/barangay-dto's/create-household.dto";
import { UpdateHouseholdDto } from "src/barangay-dto's/update-household.dto";
import { Household } from 'src/barangay-entities/household.entity';
import { Inhabitant } from 'src/inhabitant/entities/inhabitant.entity';
import { OtherInhabitant } from 'src/other-inhabitants/entities/other-inhabitant.entity';
import { Repository } from 'typeorm';

function convertEmptyToNullBoolean(value: any): boolean | null {
  if (value === '' || value === null || value === undefined) {
    return null;
  }
  return value === 'true' || value === true;
}

@Injectable()
export class HouseholdsService {
  constructor(
    @InjectRepository(Household)
    private readonly householdRepository: Repository<Household>,
    @InjectRepository(Inhabitant)
    private readonly inhabitantRepository: Repository<Inhabitant>,
    @InjectRepository(OtherInhabitant)
    private readonly otherInhabitantRepository: Repository<OtherInhabitant>,
  ) {}

  async createHousehold(
    createHouseholdDto: CreateHouseholdDto,
    file: Express.Multer.File,
  ): Promise<Household> {
    const cleanDto = {
      ...createHouseholdDto,
      allowBoarders: convertEmptyToNullBoolean(
        createHouseholdDto.allowBoarders,
      ),
      hasRentalPermit: convertEmptyToNullBoolean(
        createHouseholdDto.hasRentalPermit,
      ),
      hasBackyardGarden: convertEmptyToNullBoolean(
        createHouseholdDto.hasBackyardGarden,
      ),
    };
    const newHousehold = this.householdRepository.create({
      ...cleanDto,
    });
    newHousehold.householdPhoto = file.path;
    return this.householdRepository.save(newHousehold);
  }

  async findAllHousehold(): Promise<Household[]> {
    return await this.householdRepository.find({ relations: ['inhabitants'] });
  }
  async findOneHousehold(householdUuid: string): Promise<Household> {
    const household = await this.householdRepository.findOne({
      where: { householdUuid },
    });
    if (!household) {
      throw new NotFoundException(
        `Household with UUID ${householdUuid} not found`,
      );
    }

    return household;
  }

  async updateHousehold(
    householdUuid: string,
    updateHouseholdDto: UpdateHouseholdDto,
    file?: Express.Multer.File,
  ): Promise<Household> {
    const household = await this.householdRepository.findOne({
      where: { householdUuid },
    });

    if (!household) {
      throw new NotFoundException(
        `Household with UUID ${householdUuid} not found`,
      );
    }

    // Update fields if provided
    if (updateHouseholdDto) {
      Object.assign(household, updateHouseholdDto);
    }

    // Update photo if new file uploaded
    if (file) {
      household.householdPhoto = file.path;
    }

    return this.householdRepository.save(household);
  }

  async removeHousehold(householdUuid: string): Promise<void> {
    const result = await this.householdRepository.delete({ householdUuid });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Household with UUID ${householdUuid} not found`,
      );
    }
  }

  async findInhabitant(householdUuid: string): Promise<Inhabitant[]> {
    return this.inhabitantRepository.find({
      where: { household: { householdUuid } },
      relations: ['household'],
    });
  }

  //////

  // async getAggregatedData() {
  //   const totalHouseholds = await this.householdRepository.count();
  //   const totalInhabitants = await this.inhabitantRepository.count();
  //   const totalVoters = await this.inhabitantRepository.count({
  //     where: { isRegisteredVoter: true },
  //   });
  //   const totalNonVoters = totalInhabitants - totalVoters;

  //   return {
  //     totalHouseholds,
  //     totalInhabitants,
  //     totalVoters,
  //     totalNonVoters,
  //   };
  // }
}
