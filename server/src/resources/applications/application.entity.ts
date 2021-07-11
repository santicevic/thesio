import { ApplicationStatus } from 'src/database/enums';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Topic } from '../topics/topic.entity';
import { User } from '../users/user.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp')
  applicationDate: Date;

  @Column('timestamp')
  defenseDate: Date;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
  })
  status: ApplicationStatus;

  @ManyToOne(() => Topic, { nullable: false })
  @JoinColumn({ name: 'topicId', referencedColumnName: 'id' })
  topic: Topic;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'studentId', referencedColumnName: 'id' })
  student: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'mentorId', referencedColumnName: 'id' })
  mentor: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'presidentId', referencedColumnName: 'id' })
  president: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'thirdId', referencedColumnName: 'id' })
  third: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'fourthId', referencedColumnName: 'id' })
  fourth: User;
}
