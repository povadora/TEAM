import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inhabitant } from './entities/inhabitant.entity';
import { CreateInhabitantDto } from './dto/create-inhabitant.dto';
import { UpdateInhabitantDto } from './dto/update-inhabitant.dto';
import { Household } from 'src/barangay-entities/household.entity';
import {
  convertEmptyStringToNull,
  convertEmptyToNullBoolean,
  convertToBoolean,
} from 'src/utils/helper';

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
      where: { householdUuid: householdUuid },
    });
    if (!household) {
      throw new NotFoundException('Household not found');
    }

    const isRepresentative = convertToBoolean(
      createInhabitantDto.isRepresentative,
    );
    const isRegisteredVoter = convertToBoolean(
      createInhabitantDto.isRegisteredVoter,
    );

    const cleanDto = {
      ...createInhabitantDto,
      isRepresentative,
      isRegisteredVoter,

      gender: convertEmptyStringToNull(createInhabitantDto.gender),
      birthday: convertEmptyStringToNull(createInhabitantDto.birthday),
      civilStatus: convertEmptyStringToNull(createInhabitantDto.civilStatus),
      bloodType: convertEmptyStringToNull(createInhabitantDto.bloodType),
      expectedLabourDate: convertEmptyStringToNull(
        createInhabitantDto.expectedLabourDate,
      ),
      studentDetails: convertEmptyStringToNull(
        createInhabitantDto.studentDetails,
      ),
      isPersonWithDisability: convertEmptyToNullBoolean(
        createInhabitantDto.isPersonWithDisability,
      ),
      isPregnant: convertEmptyToNullBoolean(createInhabitantDto.isPregnant),
      isSingleParent: convertEmptyToNullBoolean(
        createInhabitantDto.isSingleParent,
      ),
      isStudent: convertEmptyToNullBoolean(createInhabitantDto.isStudent),
    };

    const newInhabitant = this.inhabitantsRepository.create({
      ...cleanDto,
      household,
    });

    if (file) {
      newInhabitant.profilePhoto = file.path;
    } else {
      newInhabitant.profilePhoto = null;
    }
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
    uuid: string,
    updateInhabitantDto: UpdateInhabitantDto,
    file?: Express.Multer.File,
  ): Promise<Inhabitant> {
    const inhabitant = await this.inhabitantsRepository.findOne({
      where: { inhabitantUuid: uuid },
    });
    if (!inhabitant) {
      throw new NotFoundException(`Inhabitant with UUID ${uuid} not found`);
    }

    const updatedInhabitant = {
      ...inhabitant,
      ...updateInhabitantDto,
    };

    if (file) {
      updatedInhabitant.profilePhoto = file.path;
    } else {
      updatedInhabitant.profilePhoto = null;
    }
    return this.inhabitantsRepository.save(updatedInhabitant);
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
