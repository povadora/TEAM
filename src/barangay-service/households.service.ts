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

  async createHousehold(
    createHouseholdDto: CreateHouseholdDto,
    file: Express.Multer.File,
  ): Promise<Household> {
    const newHousehold = this.householdRepository.create(createHouseholdDto);
    newHousehold.householdPhoto = file.path; // ma save ang file path sa database
    return this.householdRepository.save(newHousehold);
  }

  async findAllHousehold(): Promise<Household[]> {
    return await this.householdRepository.find();
  }

  async findOneHousehold(householdId: number): Promise<Household> {
    const household = await this.householdRepository.findOneBy({ householdId });
    if (!household) {
      throw new NotFoundException(`Account with ID ${householdId} not found`);
    }
    return household;
  }

  async updateHousehold(
    id: number,
    updateHouseholdDto: UpdateHouseholdDto,
    file?: Express.Multer.File,
  ): Promise<Household> {
    const household = await this.householdRepository.preload({
      householdId: id,
      ...updateHouseholdDto,
    });

    if (!household) {
      throw new NotFoundException(`Household with ID ${id} not found`);
    }

    if (file) {
      household.householdPhoto = file.path; // Update the file path if a new file is uploaded
    }

    return this.householdRepository.save(household);
  }

  async removeHousehold(householdId: number): Promise<void> {
    const result = await this.householdRepository.delete(householdId);
    if (result.affected === 0) {
      throw new NotFoundException(`Account with ID ${householdId} not found`);
    }
  }
  // kari ag sa mga inhabitants***

  async findInhabitant(householdId: number): Promise<Inhabitant[]> {
    return this.inhabitantRepository.find({
      where: { household: { householdId: householdId } },
      relations: ['household'],
    });
  }
}
