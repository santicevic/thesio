import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 90 })
  firstName: string;

  @Column({ length: 90 })
  lastName: string;

  @Column({ length: 255 })
  password: string;
}
