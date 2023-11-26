import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../../entities/base.entity';

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80 })
  name: string;

  @Column({ type: 'varchar', length: 16, unique: true })
  nickname: string;

  @Column({ type: 'varchar', length: 80, unique: true })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', select: false })
  password: string;
}
