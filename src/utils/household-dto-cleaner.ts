import { CreateHouseholdDto } from "src/barangay-dto's/create-household.dto";
import { UpdateHouseholdDto } from "src/barangay-dto's/update-household.dto";
import { Household } from 'src/barangay-entities/household.entity';
import { convertEmptyToNullBoolean } from './helper';

export function cleanHouseholdDto(
  dto: CreateHouseholdDto | UpdateHouseholdDto,
): Partial<Household> {
  return {
    ...dto,
    allowBoarders: convertEmptyToNullBoolean(dto.allowBoarders),
    hasRentalPermit: convertEmptyToNullBoolean(dto.hasRentalPermit),
    hasBackyardGarden: convertEmptyToNullBoolean(dto.hasBackyardGarden),
  };
}
