import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHouseholdDto {
  @IsOptional()
  @IsString()
  householdPhoto: string;

  @IsNotEmpty()
  @IsString()
  householdNumber: string;

  @IsNotEmpty()
  @IsString()
  householdName: string;

  @IsOptional()
  @IsString()
  streetName: string;

  @IsOptional()
  @IsString()
  subdivision: string;

  @IsOptional()
  @IsString()
  zone: string;

  @IsOptional()
  @IsString()
  sitio: string;

  @IsOptional()
  @IsString()
  purok: string;

  @IsString()
  barangay: string;

  @IsString()
  municipality: string;

  @IsString()
  province: string;

  @IsOptional()
  @IsString()
  structureMaterials: string;

  @IsOptional()
  @IsInt()
  numberOfRooms: number = 0;

  @IsOptional()
  @IsInt()
  numberOfToilets: number;

  @IsOptional()
  @IsBoolean()
  allowBoarders: boolean;

  @IsOptional()
  @IsBoolean()
  hasRentalPermit: boolean;

  @IsOptional()
  @IsBoolean()
  hasBackyardGarden: boolean;

  @IsOptional()
  @IsString()
  otherIncomeSource: string;

  @IsOptional()
  @IsInt()
  numberOfPets: number;

  @IsOptional()
  @IsInt()
  numberOfTwoWheeledVehicles: number;

  @IsOptional()
  @IsInt()
  numberOfThreeWheeledVehicles: number;

  @IsOptional()
  @IsInt()
  numberOfFourWheeledVehicles: number;
}
