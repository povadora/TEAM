import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @IsString()
  numberOfRooms: string;

  @IsOptional()
  @IsString()
  numberOfToilets: string;

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
  @IsString()
  numberOfPets: string;

  @IsOptional()
  @IsString()
  numberOfTwoWheeledVehicles: string;

  @IsOptional()
  @IsString()
  numberOfThreeWheeledVehicles: string;

  @IsOptional()
  @IsString()
  numberOfFourWheeledVehicles: string;
}
