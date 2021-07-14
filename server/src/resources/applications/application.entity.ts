import { ApplicationStatus } from 'src/database/enums';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Topic } from '../topics/topic.entity';
import { User } from '../users/user.entity';

@Entity()
@Unique(['student', 'year'])
@Unique(['topic', 'year'])
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp')
  applicationDate: Date;

  @Column('timestamp', { nullable: true })
  defenseDate: Date;

  @Column('text')
  year: string;

  @Column('int', { nullable: true })
  grade: number;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
  })
  status: ApplicationStatus;

  @ManyToOne(() => Topic)
  @JoinColumn({ name: 'topicId', referencedColumnName: 'id' })
  topic: Topic;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'studentId', referencedColumnName: 'id' })
  student: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'mentorId', referencedColumnName: 'id' })
  mentor: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'presidentId', referencedColumnName: 'id' })
  president: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'thirdId', referencedColumnName: 'id' })
  third: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'fourthId', referencedColumnName: 'id' })
  fourth: User;
}
