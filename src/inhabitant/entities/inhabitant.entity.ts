import { Household } from 'src/barangay-entities/household.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Generated,
  CreateDateColumn,
} from 'typeorm';
import {
  householdRole,
  inhabitantBloodType,
  inhabitantCivilStatus,
  inhabitantGender,
  studentDetails,
} from '../enum/inhabitant.enum';

@Entity()
export class Inhabitant {
  @PrimaryGeneratedColumn({
    name: 'inhabitant_Id',
  })
  inhabitantId: number;

  @Column({
    name: 'inhabitant_uuid',
    type: 'uuid',
    unique: true,
  })
  @Generated('uuid')
  inhabitantUuid: string;

  @Column({
    name: 'profile_photo',
    type: 'varchar',
    nullable: true,
  })
  profilePhoto: string | null;

  @Column({
    name: 'household_role',
    type: 'enum',
    enum: householdRole,
    nullable: true,
  })
  householdRole: householdRole | null;

  @Column({
    name: 'is_representative',
    type: 'boolean',
    default: false,
  })
  isRepresentative: boolean;

  @Column({
    name: 'first_name',
    type: 'varchar',
  })
  firstName: string;

  @Column({
    name: 'middle_name',
    type: 'varchar',
    nullable: true,
  })
  middleName: string | null;

  @Column({
    name: 'last_name',
    type: 'varchar',
  })
  lastName: string;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: inhabitantGender,
    nullable: true,
  })
  gender: inhabitantGender | null;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthday: Date | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  email: string | null;

  @Column({
    name: 'inhabitant_civil_status',
    type: 'enum',
    enum: inhabitantCivilStatus,
    nullable: true,
  })
  civilStatus: inhabitantCivilStatus | null;

  @Column({
    name: 'mobile_number',
    type: 'varchar',
    nullable: true,
  })
  mobileNumber: string | null;

  @Column({
    name: 'blood_type',
    type: 'enum',
    enum: inhabitantBloodType,
    nullable: true,
  })
  bloodType: inhabitantBloodType | null;

  @Column({
    name: 'health_remarks',
    type: 'text',
    nullable: true,
  })
  healthRemarks: string | null;

  @Column({
    name: 'is_person_with_disability',
    type: 'boolean',
    nullable: true,
  })
  isPersonWithDisability: boolean | null;

  @Column({
    name: 'disability_details',
    type: 'varchar',
    nullable: true,
  })
  disabilityDetails: string | null;

  @Column({
    name: 'is_pregnant',
    type: 'boolean',
    nullable: true,
  })
  isPregnant: boolean | null;

  @Column({
    name: 'expected_labour_date',
    type: 'date',
    nullable: true,
  })
  expectedLabourDate: Date | null;

  @Column({
    name: 'is_single_parent',
    type: 'boolean',
    nullable: true,
  })
  isSingleParent: boolean | null;

  @Column({
    name: 'is_student',
    type: 'boolean',
    nullable: true,
  })
  isStudent: boolean | null;

  @Column({
    name: 'student_details',
    type: 'enum',
    enum: studentDetails,
    nullable: true,
  })
  studentDetails: studentDetails | null;

  @Column({
    name: 'is_registered_voter',
    type: 'boolean',
    default: false,
  })
  isRegisteredVoter: boolean;

  @Column({
    name: 'place_of_registration',
    type: 'text',
    nullable: true,
  })
  placeOfRegistration: string | null;

  @Column({
    name: 'occupation',
    type: 'varchar',
    nullable: true,
  })
  occupation: string | null;

  @Column({
    name: 'current_occupation_place',
    type: 'varchar',
    nullable: true,
  })
  currentOccupationPlace: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Household, (household) => household.inhabitants)
  @JoinColumn({
    name: 'household_uuid',
    // referencedColumnName: 'household_uuid',
  })
  household: Household;
}
