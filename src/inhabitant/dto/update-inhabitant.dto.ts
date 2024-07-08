import { PartialType } from '@nestjs/mapped-types';
import { CreateInhabitantDto } from './create-inhabitant.dto';

export class UpdateInhabitantDto extends PartialType(CreateInhabitantDto) {}
