import { Inhabitant } from 'src/inhabitant/entities/inhabitant.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Generated,
} from 'typeorm';

@Entity()
export class Household {
  @PrimaryGeneratedColumn({ name: 'household_id' })
  householdId: number;

  @Column({ name: 'household_uuid', type: 'uuid', unique: true })
  @Generated('uuid')
  householdUuid: string;

  @Column({
    name: 'household_photo',
    type: 'varchar',
    nullable: true,
  })
  householdPhoto: string;

  @Column({ name: 'household_number', type: 'varchar' })
  householdNumber: string;

  @Column({ name: 'household_name', type: 'varchar' })
  householdName: string;

  @Column({
    name: 'steet_name',
    type: 'varchar',
    nullable: true,
  })
  streetName: string;

  @Column({ type: 'varchar', nullable: true })
  subdivision: string;

  @Column({ type: 'varchar', nullable: true })
  zone: string;

  @Column({ type: 'varchar', nullable: true })
  sitio: string;

  @Column({ type: 'varchar', nullable: true })
  purok: string;

  @Column({ type: 'varchar', default: 'Poblacion II' })
  barangay: string;

  @Column({ type: 'varchar', default: 'Tagbilaran City' })
  municipality: string;

  @Column({ type: 'varchar', default: 'Bohol' })
  province: string;

  @Column({
    name: 'structure_materials',
    type: 'text',
    nullable: true,
  })
  structureMaterials: string;

  @Column({
    name: 'number_of_rooms',
    type: 'int',
    nullable: true,
  })
  numberOfRooms: number | null;

  @Column({
    name: 'number_of_toilets',
    type: 'int',
    nullable: true,
  })
  numberOfToilets: number | null;

  @Column({ name: 'allow_boarders', type: 'boolean', nullable: true })
  allowBoarders: boolean | null;

  @Column({ name: 'has_rental_permit', type: 'boolean', nullable: true })
  hasRentalPermit: boolean | null;

  @Column({ name: 'has_backyard_garden', type: 'boolean', nullable: true })
  hasBackyardGarden: boolean | null;

  @Column({
    name: 'other_income_source',
    type: 'varchar',
    nullable: true,
  })
  otherIncomeSource: string;

  @Column({
    name: 'number_of_pets',
    type: 'int',
    nullable: true,
  })
  numberOfPets: number | null;

  @Column({
    name: 'number_of_two_wheeled_vehicles',
    type: 'int',
    nullable: true,
  })
  numberOfTwoWheeledVehicles: number | null;

  @Column({
    name: 'number_of_three_wheeled_vehicles',
    type: 'int',
    nullable: true,
  })
  numberOfThreeWheeledVehicles: number | null;

  @Column({
    name: 'number_of_four_wheeled_vehicles',
    type: 'int',
    nullable: true,
  })
  numberOfFourWheeledVehicles: number | null;

  @OneToMany(() => Inhabitant, (inhabitant) => inhabitant.household)
  inhabitants: Inhabitant[];
}
