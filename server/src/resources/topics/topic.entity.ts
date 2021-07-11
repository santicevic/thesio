import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Subject } from '../subjects/subject.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 90 })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(() => Subject, (subject) => subject.topics, { nullable: false })
  subject: Subject;
}
