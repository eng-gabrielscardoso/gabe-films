import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../../entities/base.entity';

@Entity()
export class Film extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 125 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  synopsis: string;
}
