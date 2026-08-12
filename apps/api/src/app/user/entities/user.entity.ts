import { UserData } from '@mars-colony/my-types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserDto implements UserData {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('text', { nullable: false })
  FirstName: string;

  @Column('text', { nullable: false })
  LastName: string;

  @Column('text', { nullable: true })
  MiddleName: string;

  @Column('text', { nullable: false, unique: true })
  Email: string;

  @Column('text', { nullable: false })
  PhoneNumber: string;

  @Column('text', { nullable: false })
  Password: string;
}
