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
} from '../entities/other-inhabitant.entity';

export class CreateOtherInhabitantDto {
  @IsOptional()
  @IsString()
  oiProfilePhoto: string;

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
  oiCivilStatus?: otherInhabitantCivilStatus;

  @IsOptional()
  @IsString()
  oiMobileNumber: string;

  @IsOptional()
  @IsEnum(otherInhabitantBloodType)
  oiBloodType: otherInhabitantBloodType;

  @IsOptional()
  @IsString()
  oiHealthRemarks: string;

  @IsBoolean()
  isPersonWithDisability: boolean;

  @IsOptional()
  @IsString()
  oi_DisabilityDetails: string;

  @IsBoolean()
  isPregnant: boolean;

  @IsOptional()
  @IsDate()
  expectedLabourDate: Date;

  @IsBoolean()
  isSingleParent: boolean;

  @IsBoolean()
  isStudent: boolean;

  @IsOptional()
  @IsEnum(otherStudentDetails)
  oiStudentDetails: otherStudentDetails;

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
