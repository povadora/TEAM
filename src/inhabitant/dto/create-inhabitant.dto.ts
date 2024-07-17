import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsDateString,
} from 'class-validator';
import {
  householdRole,
  inhabitantBloodType,
  inhabitantCivilStatus,
  inhabitantGender,
  studentDetails,
} from '../enum/inhabitant.enum';

export class CreateInhabitantDto {
  @IsString()
  householdUuid: string;

  @IsOptional()
  @IsString()
  profilePhoto: string;

  @IsEnum(householdRole)
  householdRole: householdRole;

  @IsOptional()
  @IsBoolean()
  isRepresentative: boolean;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName: string | null;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsEnum(inhabitantGender)
  gender: inhabitantGender | null;

  @IsOptional()
  @IsDateString({})
  birthday: string | null;

  @IsOptional()
  @IsEmail()
  email: string | null;

  @IsOptional()
  @IsEnum(inhabitantCivilStatus)
  civilStatus: inhabitantCivilStatus | null;

  @IsOptional()
  @IsString()
  mobileNumber: string | null;

  @IsOptional()
  @IsEnum(inhabitantBloodType)
  bloodType: inhabitantBloodType | null;

  @IsOptional()
  @IsString()
  healthRemarks: string | null;

  @IsOptional()
  @IsBoolean()
  isPersonWithDisability: boolean | null;

  @IsOptional()
  @IsString()
  disabilityDetails: string | null;

  @IsOptional()
  @IsBoolean()
  isPregnant: boolean | null;

  @IsOptional()
  @IsDateString({})
  expectedLabourDate: Date | null;

  @IsOptional()
  @IsBoolean()
  isSingleParent: boolean | null;

  @IsOptional()
  @IsBoolean()
  isStudent: boolean | null;

  @IsOptional()
  @IsEnum(studentDetails)
  studentDetails: studentDetails | null;

  @IsOptional()
  @IsBoolean()
  isRegisteredVoter: boolean | null;

  @IsOptional()
  @IsString()
  placeOfRegistration: string | null;

  @IsOptional()
  @IsString()
  occupation: string | null;

  @IsOptional()
  @IsString()
  currentOccupationPlace: string | null;
}
