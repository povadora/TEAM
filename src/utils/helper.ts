import { CreateInhabitantDto } from 'src/inhabitant/dto/create-inhabitant.dto';
import { Inhabitant } from 'src/inhabitant/entities/inhabitant.entity';

export function convertToBoolean(value: any): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return false;
}

export function convertEmptyStringToNull(value: any) {
  return value === '' ? null : value;
}

export function convertEmptyToNullBoolean(value: any): boolean | null {
  if (value === '' || value === null || value === undefined) {
    return null;
  }
  return value === 'true' || value === true;
}

export function cleanDtoFields(dto: any): any {
  return {
    ...dto,
    isRepresentative: convertToBoolean(dto.isRepresentative),
    isRegisteredVoter: convertToBoolean(dto.isRegisteredVoter),
    gender: convertEmptyStringToNull(dto.gender),
    birthday: convertEmptyStringToNull(dto.birthday),
    civilStatus: convertEmptyStringToNull(dto.civilStatus),
    bloodType: convertEmptyStringToNull(dto.bloodType),
    expectedLabourDate: convertEmptyStringToNull(dto.expectedLabourDate),
    studentDetails: convertEmptyStringToNull(dto.studentDetails),
    isPersonWithDisability: convertEmptyToNullBoolean(
      dto.isPersonWithDisability,
    ),
    isPregnant: convertEmptyToNullBoolean(dto.isPregnant),
    isSingleParent: convertEmptyToNullBoolean(dto.isSingleParent),
    isStudent: convertEmptyToNullBoolean(dto.isStudent),
  };
}

export function cleanInhabitantDto(
  dto: CreateInhabitantDto,
): Partial<Inhabitant> {
  return {
    ...dto,
    isRepresentative: convertToBoolean(dto.isRepresentative),
    isRegisteredVoter: convertToBoolean(dto.isRegisteredVoter),
    gender: convertEmptyStringToNull(dto.gender),
    birthday: convertEmptyStringToNull(dto.birthday),
    civilStatus: convertEmptyStringToNull(dto.civilStatus),
    bloodType: convertEmptyStringToNull(dto.bloodType),
    expectedLabourDate: convertEmptyStringToNull(dto.expectedLabourDate),
    studentDetails: convertEmptyStringToNull(dto.studentDetails),
    isPersonWithDisability: convertEmptyToNullBoolean(
      dto.isPersonWithDisability,
    ),
    isPregnant: convertEmptyToNullBoolean(dto.isPregnant),
    isSingleParent: convertEmptyToNullBoolean(dto.isSingleParent),
    isStudent: convertEmptyToNullBoolean(dto.isStudent),
  };
}
