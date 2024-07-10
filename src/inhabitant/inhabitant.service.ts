import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inhabitant } from './entities/inhabitant.entity';
import { CreateInhabitantDto } from './dto/create-inhabitant.dto';
import { UpdateInhabitantDto } from './dto/update-inhabitant.dto';
import { Household } from 'src/barangay-entities/household.entity';

function convertToBoolean(value: any): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return false;
}

const convertEmptyStringToNull = (value: any) => {
  return value === '' ? null : value;
};

function convertEmptyToNullBoolean(value: any): boolean | null {
  if (value === '' || value === null || value === undefined) {
    return null;
  }
  return value === 'true' || value === true;
}
@Injectable()
export class InhabitantService {
  constructor(
    @InjectRepository(Inhabitant)
    private readonly inhabitantsRepository: Repository<Inhabitant>,
    @InjectRepository(Household)
    private readonly householdsRepository: Repository<Household>,
  ) {}

  // async createInhabitant(
  //   createInhabitantDto: CreateInhabitantDto,
  //   file: Express.Multer.File,
  // ): Promise<Inhabitant> {
  //   const household = await this.householdsRepository.findOne({
  //     where: { householdUuid: createInhabitantDto.householdUuid },
  //   });
  //   if (!household) {
  //     throw new NotFoundException('Household not found');
  //   }

  //   const isRepresentative = createInhabitantDto.isRepresentative === 'true';
  //   const cleanDto = {
  //     ...createInhabitantDto,
  //     isRepresentative,
  //     gender: convertEmptyStringToNull(createInhabitantDto.gender),
  //     birthday: convertEmptyStringToNull(createInhabitantDto.birthday),
  //     civilStatus: convertEmptyStringToNull(createInhabitantDto.civilStatus),
  //     bloodType: convertEmptyStringToNull(createInhabitantDto.bloodType),
  //     expectedLabourDate: convertEmptyStringToNull(
  //       createInhabitantDto.expectedLabourDate,
  //     ),
  //     studentDetails: convertEmptyStringToNull(
  //       createInhabitantDto.studentDetails,
  //     ),

  //     isPersonWithDisability: convertEmptyToNullBoolean(
  //       createInhabitantDto.isPersonWithDisability,
  //     ),
  //     isPregnant: convertEmptyToNullBoolean(createInhabitantDto.isPregnant),
  //     isSingleParent: convertEmptyStringToNull(
  //       createInhabitantDto.isSingleParent,
  //     ),
  //     isStudent: convertEmptyToNullBoolean(createInhabitantDto.isStudent),
  //   };

  //   const newInhabitant = this.inhabitantsRepository.create({
  //     ...cleanDto,
  //     household,
  //   });

  //   if (file) {
  //     newInhabitant.profilePhoto = file.path;
  //   }
  //   console.log(cleanDto);
  //   console.log(newInhabitant);
  //   return this.inhabitantsRepository.save(newInhabitant);
  // }

  async createInhabitant(
    createInhabitantDto: CreateInhabitantDto,
    file: Express.Multer.File,
  ): Promise<Inhabitant> {
    const household = await this.householdsRepository.findOne({
      where: { householdUuid: createInhabitantDto.householdUuid },
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
    }

    console.log(newInhabitant);

    return this.inhabitantsRepository.save(newInhabitant);
  }

  findAllInhabitants(): Promise<Inhabitant[]> {
    return this.inhabitantsRepository.find({ relations: ['household'] });
  }

  async findOneInhabitant(uuid: string): Promise<Inhabitant> {
    const inhabitant = await this.inhabitantsRepository.findOne({
      where: { InhabitantUuid: uuid },
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
    //   const inhabitant = await this.inhabitantsRepository.preload({
    //     inhabitantId: uuid,
    //     ...updateInhabitantDto,
    //   });

    //   if (!inhabitant) {
    //     throw new NotFoundException(`Inhabitant with ID ${uuid} not found`);
    //   }

    //   if (file) {
    //     inhabitant.profilePhoto = file.path;
    //   }

    //   return this.inhabitantsRepository.save(inhabitant);
    // }

    const inhabitant = await this.inhabitantsRepository.findOne({
      where: { InhabitantUuid: uuid },
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
    }

    return this.inhabitantsRepository.save(updatedInhabitant);
  }

  async removeInhabitant(uuid: string): Promise<void> {
    const result = await this.inhabitantsRepository.delete(uuid);
    if (result.affected === 0) {
      throw new NotFoundException(`Inhabitant with ID ${uuid} not found`);
    }
  }
}