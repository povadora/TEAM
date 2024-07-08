import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inhabitant } from './entities/inhabitant.entity';
import { CreateInhabitantDto } from './dto/create-inhabitant.dto';
import { UpdateInhabitantDto } from './dto/update-inhabitant.dto';
import { Household } from 'src/barangay-entities/household.entity';

@Injectable()
export class InhabitantService {
  constructor(
    @InjectRepository(Inhabitant)
    private readonly inhabitantsRepository: Repository<Inhabitant>,
    @InjectRepository(Household)
    private readonly householdsRepository: Repository<Household>,
  ) {}

  async createInhabitant(
    createInhabitantDto: CreateInhabitantDto,
    file: Express.Multer.File,
  ): Promise<Inhabitant> {
    const household = await this.householdsRepository.findOne({
      where: { householdId: createInhabitantDto.householdId },
    });
    if (!household) {
      throw new NotFoundException('Household not found');
    }

    const newInhabitant = this.inhabitantsRepository.create({
      ...createInhabitantDto,
      household,
    });

    if (file) {
      newInhabitant.profilePhoto = file.path;
    }

    return this.inhabitantsRepository.save(newInhabitant);
  }

  findAllInhabitants(): Promise<Inhabitant[]> {
    return this.inhabitantsRepository.find({ relations: ['household'] });
  }

  async findOneInhabitant(id: number): Promise<Inhabitant> {
    const inhabitant = await this.inhabitantsRepository.findOne({
      where: { inhabitantId: id },
      relations: ['household'],
    });
    if (!inhabitant) {
      throw new NotFoundException(`Inhabitant with ID ${id} not found`);
    }
    return inhabitant;
  }

  async updateInhabitant(
    id: number,
    updateInhabitantDto: UpdateInhabitantDto,
    file?: Express.Multer.File,
  ): Promise<Inhabitant> {
    const inhabitant = await this.inhabitantsRepository.preload({
      inhabitantId: id,
      ...updateInhabitantDto,
    });

    if (!inhabitant) {
      throw new NotFoundException(`Inhabitant with ID ${id} not found`);
    }

    if (file) {
      inhabitant.profilePhoto = file.path;
    }

    return this.inhabitantsRepository.save(inhabitant);
  }

  async removeInhabitant(id: number): Promise<void> {
    const result = await this.inhabitantsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Inhabitant with ID ${id} not found`);
    }
  }
}
