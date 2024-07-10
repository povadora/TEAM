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
} from '../entities/inhabitant.entity';

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
  middleName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsEnum(inhabitantGender)
  gender: inhabitantGender;

  @IsOptional()
  @IsDateString({})
  birthday: string | null;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(inhabitantCivilStatus)
  civilStatus: inhabitantCivilStatus;

  @IsOptional()
  @IsString()
  mobileNumber: string;

  @IsOptional()
  @IsEnum(inhabitantBloodType)
  bloodType: inhabitantBloodType;

  @IsOptional()
  @IsString()
  healthRemarks: string;

  @IsOptional()
  @IsBoolean()
  isPersonWithDisability: boolean;

  @IsOptional()
  @IsString()
  disabilityDetails: string;

  @IsOptional()
  @IsBoolean()
  isPregnant: boolean;

  @IsOptional()
  @IsDateString({})
  expectedLabourDate: Date | null;

  @IsOptional()
  @IsBoolean()
  isSingleParent: boolean;

  @IsOptional()
  @IsBoolean()
  isStudent: boolean;

  @IsOptional()
  @IsEnum(studentDetails)
  studentDetails: studentDetails;

  @IsOptional()
  @IsBoolean()
  isRegisteredVoter: boolean;

  @IsOptional()
  @IsString()
  placeOfRegistration: string;

  @IsOptional()
  @IsString()
  occupation: string;

  @IsOptional()
  @IsString()
  currentOccupationPlace: string;
}
