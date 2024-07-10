import { Household } from 'src/barangay-entities/household.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Generated,
} from 'typeorm';

export enum householdRole {
  SON = 'Son',
  DAUGHTER = 'Daughter',
  FATHER = 'Father',
  MOTHER = 'Mother',
  FRIEND = 'Friend',
  IN_LAW = 'In-law',
  RELATIVE = 'Relative',
  WORKER = 'Worker',
  TENANT = 'Tenant',
  OTHER = 'Other',
}

export enum inhabitantGender {
  MALE = 'Male',
  FEMALE = 'Female',
  NON_BINARY = 'Non-binary',
  PREFER_NOT_TO_SAY = 'Prefer not to say',
}

export enum inhabitantCivilStatus {
  SINGLE = 'Single',
  MARRIED = 'Married',
  SEPARATED = 'Separated',
  WIDOW = 'Widow',
}

export enum inhabitantBloodType {
  B_NEGATIVE = 'B RhD negative (B-)',
  O_POSITIVE = 'O RhD positive (O+)',
  O_NEGATIVE = 'O RhD negative (O-)',
  AB_POSITIVE = 'AB RhD positive (AB+)',
  AB_NEGATIVE = 'AB RhD negative (AB-)',
}

export enum studentDetails {
  ELEMENTARY = 'Elementary',
  HIGHSCHOOL = 'Highschool',
  SENIOR_HIGHSCHOOL = 'Senior Highschool',
  COLLEGE = 'College',
}

@Entity()
export class Inhabitant {
  @PrimaryGeneratedColumn({ name: 'inhabitant_Id' })
  inhabitantId: number;

  @Column({ name: 'inhabitant_uuid', type: 'uuid', unique: true })
  @Generated('uuid')
  InhabitantUuid: string;

  @ManyToOne(() => Household, (household) => household.inhabitants)
  @JoinColumn({ name: 'household_uuid' })
  household: Household;

  @Column({
    name: 'profile_photo',
    nullable: true,
  })
  profilePhoto: string;

  @Column({
    name: 'household_role',
    type: 'enum',
    enum: householdRole,
    nullable: true,
  })
  householdRole: householdRole;

  @Column({
    name: 'is_representative',
    default: false,
  })
  isRepresentative: boolean;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({
    name: 'middle_name',
    nullable: true,
  })
  middleName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: inhabitantGender,
    nullable: true,
  })
  gender: inhabitantGender;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthday: Date | null;

  @Column({ nullable: true })
  email: string;

  @Column({
    name: 'inhabitant_civil_status',
    type: 'enum',
    enum: inhabitantCivilStatus,
    nullable: true,
  })
  civilStatus: inhabitantCivilStatus;

  @Column({
    name: 'mobile_number',
    nullable: true,
  })
  mobileNumber: string;

  @Column({
    name: 'blood_type',
    type: 'enum',
    enum: inhabitantBloodType,
    nullable: true,
  })
  bloodType: inhabitantBloodType;

  @Column({
    name: 'health_remarks',
    nullable: true,
  })
  healthRemarks: string;

  @Column({
    name: 'is_person_with_disability',
    default: false,
  })
  isPersonWithDisability: boolean;

  @Column({
    name: 'disability_details',
    nullable: true,
  })
  disabilityDetails: string;

  @Column({
    name: 'is_pregnant',
    default: false,
  })
  isPregnant: boolean;

  @Column({
    name: 'expected_labour_date',
    type: 'date',
    nullable: true,
  })
  expectedLabourDate: Date;

  @Column({
    name: 'is_single_parent',
    default: false,
  })
  isSingleParent: boolean;

  @Column({
    name: 'is_student',
    default: false,
  })
  isStudent: boolean;

  @Column({
    name: 'student_details',
    type: 'enum',
    enum: studentDetails,
    nullable: true,
  })
  studentDetails: studentDetails;

  @Column({
    name: 'is_registered_voter',
    default: false,
  })
  isRegisteredVoter: boolean;

  @Column({
    name: 'place_of_registration',
    type: 'text',
    nullable: true,
  })
  placeOfRegistration: string;

  @Column({
    name: 'occupation',
    nullable: true,
  })
  occupation: string;

  @Column({
    name: 'current_occupation_place',
    nullable: true,
  })
  currentOccupationPlace: string;
}
