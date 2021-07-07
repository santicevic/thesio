import { FieldOfStudies } from 'src/database/enums';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => User, (user) => user.taughtClasses, { nullable: false })
  professor: User;

  @OneToMany(() => Topic, (topic) => topic.subject)
  topics: Topic[];
}
