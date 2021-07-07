import { ThesisLevel } from 'src/database/enums';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Subject } from '../subjects/subject.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 90 })
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: ThesisLevel,
  })
  study: ThesisLevel;

  @ManyToOne(() => Subject, (subject) => subject.topics, { nullable: false })
  subject: Subject;
}
