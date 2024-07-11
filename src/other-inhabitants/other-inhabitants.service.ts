import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOtherInhabitantDto } from './dto/create-other-inhabitant.dto';
import { UpdateOtherInhabitantDto } from './dto/update-other-inhabitant.dto';
import { OtherInhabitant } from './entities/other-inhabitant.entity';

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
export class OtherInhabitantsService {
  constructor(
    @InjectRepository(OtherInhabitant)
    private readonly otherInhabitantRepository: Repository<OtherInhabitant>,
  ) {}

  async createOtherInhabitant(
    createOtherInhabitantDto: CreateOtherInhabitantDto,
    file: Express.Multer.File,
  ) {
    const isRepresentative = convertToBoolean(
      createOtherInhabitantDto.isRepresentative,
    );
    const isRegisteredVoter = convertToBoolean(
      createOtherInhabitantDto.isRegisteredVoter,
    );

    const cleanDto = {
      ...createOtherInhabitantDto,
      isRepresentative,
      isRegisteredVoter,
      oiGender: convertEmptyStringToNull(createOtherInhabitantDto.oiGender),
      birthday: convertEmptyStringToNull(createOtherInhabitantDto.birthday),
      oiCivilStatus: convertEmptyStringToNull(
        createOtherInhabitantDto.oiCivilStatus,
      ),
      oiBloodType: convertEmptyStringToNull(
        createOtherInhabitantDto.oiBloodType,
      ),
      expectedLabourDate: convertEmptyStringToNull(
        createOtherInhabitantDto.expectedLabourDate,
      ),
      oiStudentDetails: convertEmptyStringToNull(
        createOtherInhabitantDto.oiStudentDetails,
      ),
      // for the bolean
      isPersonWithDisability: convertEmptyToNullBoolean(
        createOtherInhabitantDto.isPersonWithDisability,
      ),
      isPregnant: convertEmptyToNullBoolean(
        createOtherInhabitantDto.isPregnant,
      ),
      isSingleParent: convertEmptyToNullBoolean(
        createOtherInhabitantDto.isSingleParent,
      ),
      isStudent: convertEmptyToNullBoolean(createOtherInhabitantDto.isStudent),
    };

    console.log(createOtherInhabitantDto);
    const otherInhabitant = this.otherInhabitantRepository.create({
      ...cleanDto,
      oiProfilePhoto: file ? file.filename : null,
    });

    console.log(createOtherInhabitantDto);
    return this.otherInhabitantRepository.save(otherInhabitant);
  }

  async findAllOtherInhabitants() {
    return this.otherInhabitantRepository.find();
  }

  async findOneOtherInhabitant(oiUuid: string) {
    const otherInhabitant = await this.otherInhabitantRepository.findOne({
      where: { oiUuid },
    });
    if (!otherInhabitant) {
      throw new NotFoundException(
        `Other Inhabitant with ID ${oiUuid} not found`,
      );
    }
    return otherInhabitant;
  }

  // async updateOtherInhabitant(
  //   oiUuid: string,
  //   updateOtherInhabitantDto: UpdateOtherInhabitantDto,
  //   file: Express.Multer.File,
  // ) {
  //   const otherInhabitant = await this.findOne({ where: oiUuid });
  //   if (!otherInhabitant) {
  //     throw new NotFoundException(
  //       `Other Inhabitant with ID ${oiUuid} not found`,
  //     );
  //   }

  //   Object.assign(otherInhabitant, updateOtherInhabitantDto);
  //   if (file) {
  //     otherInhabitant.oiProfilePhoto = file.filename;
  //   }

  //   return this.otherInhabitantRepository.save(otherInhabitant);
  // }
  //

  async updateOtherInhabitant(
    oiUuid: string,
    updateOtherInhabitantDto: UpdateOtherInhabitantDto,
    file: Express.Multer.File,
  ) {
    const otherInhabitant = await this.findOneOtherInhabitant(oiUuid);
    if (!otherInhabitant) {
      throw new NotFoundException(
        `Other Inhabitant with ID ${oiUuid} not found`,
      );
    }

    const cleanDto = {
      ...updateOtherInhabitantDto,
      isRepresentative: convertEmptyToNullBoolean(
        updateOtherInhabitantDto.isRepresentative,
      ),
      isRegisteredVoter: convertEmptyToNullBoolean(
        updateOtherInhabitantDto.isRegisteredVoter,
      ),
      oiGender: convertEmptyStringToNull(updateOtherInhabitantDto.oiGender),
      birthday: convertEmptyStringToNull(updateOtherInhabitantDto.birthday),
      oiCivilStatus: convertEmptyStringToNull(
        updateOtherInhabitantDto.oiCivilStatus,
      ),
      oiBloodType: convertEmptyStringToNull(
        updateOtherInhabitantDto.oiBloodType,
      ),
      expectedLabourDate: convertEmptyStringToNull(
        updateOtherInhabitantDto.expectedLabourDate,
      ),
      oiStudentDetails: convertEmptyStringToNull(
        updateOtherInhabitantDto.oiStudentDetails,
      ),
      isPersonWithDisability: convertEmptyToNullBoolean(
        updateOtherInhabitantDto.isPersonWithDisability,
      ),
      isPregnant: convertEmptyToNullBoolean(
        updateOtherInhabitantDto.isPregnant,
      ),
      isSingleParent: convertEmptyToNullBoolean(
        updateOtherInhabitantDto.isSingleParent,
      ),
      isStudent: convertEmptyToNullBoolean(updateOtherInhabitantDto.isStudent),
    };

    Object.assign(otherInhabitant, cleanDto);

    if (file) {
      otherInhabitant.oiProfilePhoto = file.filename;
    }

    return this.otherInhabitantRepository.save(otherInhabitant);
  }

  async removeOtherInhabitant(oiUuid: string) {
    const result = await this.otherInhabitantRepository.delete(oiUuid);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Other Inhabitant with ID ${oiUuid} not found`,
      );
    }
    return result;
  }
}
