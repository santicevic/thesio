import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Subject } from '../subjects/subject.entity';
import { FieldOfStudies, Level, UserRole } from 'src/database/enums';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 90 })
  firstName: string;

  @Column({ length: 90 })
  lastName: string;

  @Column({ length: 90, unique: true })
  email: string;

  @Column({ length: 255, select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: Level,
    nullable: true,
  })
  studentLevel: Level;

  @Column({
    type: 'enum',
    enum: FieldOfStudies,
  })
  study: FieldOfStudies;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @OneToMany(() => Subject, (subject) => subject.professor)
  taughtClasses: Subject[];

  @ManyToMany(() => Subject)
  @JoinTable()
  enrolledSubjects: Subject[];
}
