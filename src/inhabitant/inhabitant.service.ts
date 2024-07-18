import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inhabitant } from './entities/inhabitant.entity';
import { CreateInhabitantDto } from './dto/create-inhabitant.dto';
import { UpdateInhabitantDto } from './dto/update-inhabitant.dto';
import { Household } from 'src/barangay-entities/household.entity';
import { cleanDtoFields, cleanInhabitantDto } from 'src/utils/helper';

@Injectable()
export class InhabitantService {
  constructor(
    @InjectRepository(Inhabitant)
    private readonly inhabitantsRepository: Repository<Inhabitant>,
    @InjectRepository(Household)
    private readonly householdsRepository: Repository<Household>,
  ) {}

  async createInhabitant(
    householdUuid: string,
    createInhabitantDto: CreateInhabitantDto,
    file?: Express.Multer.File,
  ): Promise<Inhabitant> {
    const household = await this.householdsRepository.findOne({
      where: { householdUuid },
    });

    if (!household) {
      throw new NotFoundException('Household not found');
    }

    const cleanDto = cleanInhabitantDto(createInhabitantDto);

    const newInhabitant = this.inhabitantsRepository.create({
      ...cleanDto,
      household,
    });

    newInhabitant.profilePhoto = file ? file.path : null;

    return this.inhabitantsRepository.save(newInhabitant);
  }

  findAllInhabitants(): Promise<Inhabitant[]> {
    return this.inhabitantsRepository.find({ relations: ['household'] });
  }

  async findOneInhabitant(uuid: string): Promise<Inhabitant> {
    const inhabitant = await this.inhabitantsRepository.findOne({
      where: { inhabitantUuid: uuid },
      relations: ['household'],
    });
    if (!inhabitant) {
      throw new NotFoundException(`Inhabitant with ID ${uuid} not found`);
    }
    return inhabitant;
  }

  async updateInhabitant(
    inhabitantUuid: string,
    updateInhabitantDto: UpdateInhabitantDto,
    file?: Express.Multer.File,
  ): Promise<Inhabitant> {
    const inhabitant = await this.inhabitantsRepository.findOne({
      where: { inhabitantUuid },
    });
    if (!inhabitant) {
      throw new NotFoundException(
        `Inhabitant with UUID ${inhabitantUuid} not found`,
      );
    }

    const cleanDto = cleanDtoFields(updateInhabitantDto);

    if (file) {
      cleanDto.profilePhoto = file.path;
    }

    if (updateInhabitantDto.householdUuid) {
      const household = await this.householdsRepository.findOne({
        where: { householdUuid: updateInhabitantDto.householdUuid },
      });
      if (!household) {
        throw new NotFoundException(
          `Household with UUID ${updateInhabitantDto.householdUuid} not found`,
        );
      }
      cleanDto.household = household;
    }

    delete cleanDto.householdUuid;

    try {
      await this.inhabitantsRepository.update({ inhabitantUuid }, cleanDto);
      return this.inhabitantsRepository.findOne({ where: { inhabitantUuid } });
    } catch (error) {
      console.error('Error updating inhabitant:', error);
      throw new InternalServerErrorException('Failed to update inhabitant');
    }
  }

  async removeInhabitant(inhabitantUuid: string): Promise<void> {
    const result = await this.inhabitantsRepository.delete({ inhabitantUuid });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Inhabitant with ID ${inhabitantUuid} not found`,
      );
    }
  }
}
