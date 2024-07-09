import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHouseholdDto } from "src/barangay-dto's/create-household.dto";
import { UpdateHouseholdDto } from "src/barangay-dto's/update-household.dto";
import { Household } from 'src/barangay-entities/household.entity';
import { Inhabitant } from 'src/inhabitant/entities/inhabitant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HouseholdsService {
  constructor(
    @InjectRepository(Household)
    private readonly householdRepository: Repository<Household>,
    @InjectRepository(Inhabitant)
    private readonly inhabitantRepository: Repository<Inhabitant>,
  ) {}

  private setDefaultValues(
    dto: Partial<CreateHouseholdDto>,
  ): Partial<CreateHouseholdDto> {
    return {
      numberOfRooms: dto.numberOfRooms || 0,
      numberOfToilets: dto.numberOfToilets || 0,
      numberOfPets: dto.numberOfPets || 0,
      numberOfTwoWheeledVehicles: dto.numberOfTwoWheeledVehicles || 0,
      numberOfThreeWheeledVehicles: dto.numberOfThreeWheeledVehicles || 0,
      numberOfFourWheeledVehicles: dto.numberOfFourWheeledVehicles || 0,
      ...dto,
    };
  }

  async createHousehold(
    createHouseholdDto: CreateHouseholdDto,
    file: Express.Multer.File,
  ): Promise<Household> {
    const householdDtoWithDefaults = this.setDefaultValues(createHouseholdDto);

    const newHousehold = this.householdRepository.create(
      householdDtoWithDefaults,
    );

    if (file) {
      newHousehold.householdPhoto = file.path;
    }

    return this.householdRepository.save(newHousehold);
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

  async findAllHousehold(): Promise<Household[]> {
    return await this.householdRepository.find();
  }
}
