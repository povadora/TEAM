import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  otherInhabitantGender,
  otherInhabitantCivilStatus,
  otherInhabitantBloodType,
  otherStudentDetails,
  oiHouseholdRole,
} from '../entities/other-inhabitant.entity';

export class CreateOtherInhabitantDto {
  @IsOptional()
  @IsString()
  oiProfilePhoto: string;

  @IsEnum(oiHouseholdRole)
  oiHouseholdRole: oiHouseholdRole;

  @IsOptional()
  @IsBoolean()
  isRepresentative: boolean;

  @IsNotEmpty()
  @IsString()
  oiFirstName: string;

  @IsOptional()
  @IsString()
  oiMiddleName: string;

  @IsNotEmpty()
  @IsString()
  oiLastName: string;

  @IsOptional()
  @IsEnum(otherInhabitantGender)
  oiGender: otherInhabitantGender;

  @IsOptional()
  @IsDate()
  birthday: Date;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(otherInhabitantCivilStatus)
  oiCivilStatus: otherInhabitantCivilStatus;

  @IsOptional()
  @IsString()
  oiMobileNumber: string;

  @IsOptional()
  @IsEnum(otherInhabitantBloodType)
  oiBloodType: otherInhabitantBloodType;

  @IsOptional()
  @IsString()
  oiHealthRemarks: string;

  @IsOptional()
  @IsBoolean()
  isPersonWithDisability: boolean;

  @IsOptional()
  @IsString()
  oiDisabilityDetails: string;

  @IsOptional()
  @IsBoolean()
  isPregnant: boolean;

  @IsOptional()
  @IsDate()
  expectedLabourDate: Date;

  @IsOptional()
  @IsBoolean()
  isSingleParent: boolean;

  @IsOptional()
  @IsBoolean()
  isStudent: boolean;

  @IsOptional()
  @IsEnum(otherStudentDetails)
  oiStudentDetails: otherStudentDetails;

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
