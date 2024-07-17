import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHouseholdDto {
  @IsOptional()
  @IsString()
  householdPhoto: string | null;

  @IsNotEmpty()
  @IsString()
  householdNumber: string;

  @IsNotEmpty()
  @IsString()
  householdName: string;

  @IsOptional()
  @IsString()
  streetName: string | null;

  @IsOptional()
  @IsString()
  subdivision: string | null;

  @IsOptional()
  @IsString()
  zone: string | null;

  @IsOptional()
  @IsString()
  sitio: string | null;

  @IsOptional()
  @IsString()
  purok: string | null;

  @IsString()
  barangay: string;

  @IsString()
  municipality: string;

  @IsString()
  province: string;

  @IsOptional()
  @IsString()
  structureMaterials: string | null;

  @IsOptional()
  @IsString()
  numberOfRooms: string | null;

  @IsOptional()
  @IsString()
  numberOfToilets: string | null;

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
  otherIncomeSource: string | null;

  @IsOptional()
  @IsString()
  numberOfPets: string | null;

  @IsOptional()
  @IsString()
  numberOfTwoWheeledVehicles: string | null;

  @IsOptional()
  @IsString()
  numberOfThreeWheeledVehicles: string | null;

  @IsOptional()
  @IsString()
  numberOfFourWheeledVehicles: string | null;
}
