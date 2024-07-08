import { PartialType } from '@nestjs/mapped-types';
import { CreateOtherInhabitantDto } from './create-other-inhabitant.dto';

export class UpdateOtherInhabitantDto extends PartialType(CreateOtherInhabitantDto) {}
