import { FieldOfStudies, Level } from 'src/database/enums';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Topic } from '../topics/topic.entity';
import { User } from '../users/user.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 90 })
  name: string;

  @Column({
    type: 'enum',
    enum: FieldOfStudies,
  })
  study: FieldOfStudies;

  @Column({
    type: 'enum',
    enum: Level,
  })
  level: Level;

  @ManyToOne(() => User, (user) => user.taughtClasses, { nullable: false })
  professor: User;

  @OneToMany(() => Topic, (topic) => topic.subject)
  topics: Topic[];

  @ManyToMany(() => User, (user) => user.enrolledSubjects)
  students: User[];
}
