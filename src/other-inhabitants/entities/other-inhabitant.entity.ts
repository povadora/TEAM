// oi  means Other Inhabitant
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum otherInhabitantGender {
  MALE = 'Male',
  FEMALE = 'Female',
  NON_BINARY = 'Non-binary',
  PREFER_NOT_TO_SAY = 'Prefer not to say',
}

export enum otherInhabitantCivilStatus {
  SINGLE = 'Single',
  MARRIED = 'Married',
  SEPARATED = 'Separated',
  WIDOW = 'Widow',
}

export enum otherInhabitantBloodType {
  B_NEGATIVE = 'B RhD negative (B-)',
  O_POSITIVE = 'O RhD positive (O+)',
  O_NEGATIVE = 'O RhD negative (O-)',
  AB_POSITIVE = 'AB RhD positive (AB+)',
  AB_NEGATIVE = 'AB RhD negative (AB-)',
}

export enum otherStudentDetails {
  ELEMENTARY = 'Elementary',
  HIGHSCHOOL = 'Highschool',
  SENIOR_HIGHSCHOOL = 'Senior Highschool',
  COLLEGE = 'College',
}

@Entity()
export class OtherInhabitant {
  @PrimaryGeneratedColumn({ name: 'ohter_inhabitant_Id' })
  otherInhabitantId: number;

  @Column({
    name: 'oi_profile_photo',
    nullable: true,
  })
  oiProfilePhoto: string;

  @Column({
    name: 'is_representative',
    default: false,
  })
  isRepresentative: boolean;

  @Column({ name: 'oi_first_name' })
  oiFirstName: string;

  @Column({
    name: 'oi_middle_name',
    nullable: true,
  })
  oiMiddleName: string;

  @Column({ name: 'oi_last_name' })
  oiLastName: string;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: otherInhabitantGender,
    nullable: true,
  })
  oiGender: otherInhabitantGender;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  email: string;

  @Column({
    name: 'oi_civil_status',
    type: 'enum',
    enum: otherInhabitantCivilStatus,
    nullable: true,
  })
  oiCivilStatus: otherInhabitantCivilStatus;

  @Column({
    name: 'oi_mobile_number',
    nullable: true,
  })
  oiMobileNumber: string;

  @Column({
    name: 'oi_blood_type',
    type: 'enum',
    enum: otherInhabitantBloodType,
    nullable: true,
  })
  oiBloodType: otherInhabitantBloodType;

  @Column({
    name: 'oi_health_remarks',
    nullable: true,
  })
  oiHealthRemarks: string;

  @Column({
    name: 'is_person_with_disability',
    default: false,
  })
  isPersonWithDisability: boolean;

  @Column({
    name: 'oi_disability_details',
    nullable: true,
  })
  oi_DisabilityDetails: string;

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
    enum: otherStudentDetails,
    nullable: true,
  })
  oiStudentDetails: otherStudentDetails;

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
