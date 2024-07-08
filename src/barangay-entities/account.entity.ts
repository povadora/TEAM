import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export enum accountRole {
  ADMIN = 'Admin',
  EMUMERATOR = 'Emurator',
  INTERN = 'Intern',
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn({ name: 'account_Id' })
  accountId: number;

  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'password_hash' })
  hash: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ type: 'enum', enum: accountRole, default: accountRole.INTERN })
  role: accountRole;
}
