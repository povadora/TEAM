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
  numberOfRooms: number | null;

  @IsOptional()
  @IsInt()
  numberOfToilets: number | null;

  @IsOptional()
  @IsBoolean()
  allowBoarders: boolean | null;

  @IsOptional()
  @IsBoolean()
  hasRentalPermit: boolean | null;

  @IsOptional()
  @IsBoolean()
  hasBackyardGarden: boolean | null;

  @IsOptional()
  @IsString()
  otherIncomeSource: string;

  @IsOptional()
  @IsInt()
  numberOfPets: number | null;

  @IsOptional()
  @IsInt()
  numberOfTwoWheeledVehicles: number | null;

  @IsOptional()
  @IsInt()
  numberOfThreeWheeledVehicles: number | null;

  @IsOptional()
  @IsInt()
  numberOfFourWheeledVehicles: number | null;
}
