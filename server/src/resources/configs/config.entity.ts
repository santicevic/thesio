import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  key: string;

  @Column('text')
  value: string;
}
