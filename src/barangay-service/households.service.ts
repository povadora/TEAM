import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHouseholdDto } from "src/barangay-dto's/create-household.dto";
import { UpdateHouseholdDto } from "src/barangay-dto's/update-household.dto";
import { Household } from 'src/barangay-entities/household.entity';
import { Inhabitant } from 'src/inhabitant/entities/inhabitant.entity';
import { OtherInhabitant } from 'src/other-inhabitants/entities/other-inhabitant.entity';
import { convertEmptyToNullBoolean } from 'src/utils/helper';
import { Repository } from 'typeorm';

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
    file?: Express.Multer.File,
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

    if (file) {
      newHousehold.householdPhoto = file.path;
    } else {
      newHousehold.householdPhoto = null;
    }
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

    const cleanDto = {
      ...updateHouseholdDto,
      allowBoarders: convertEmptyToNullBoolean(
        updateHouseholdDto.allowBoarders,
      ),
      hasRentalPermit: convertEmptyToNullBoolean(
        updateHouseholdDto.hasRentalPermit,
      ),
      hasBackyardGarden: convertEmptyToNullBoolean(
        updateHouseholdDto.hasBackyardGarden,
      ),
    };

    console.log('Updating household:', householdUuid);
    console.log('Update data:', cleanDto);

    Object.keys(cleanDto).forEach((key) => {
      if (cleanDto[key] !== undefined) {
        household[key] = cleanDto[key];
      }
    });

    if (file) {
      household.householdPhoto = file.path;
    }

    try {
      await this.householdRepository.update({ householdUuid }, household);
      return this.householdRepository.findOne({ where: { householdUuid } });
    } catch (error) {
      console.error('Error updating household:', error);
      throw error;
    }
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
}
