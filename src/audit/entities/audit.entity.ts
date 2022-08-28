import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'audit' })
export class AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tableName: string;

  @Column()
  action: string;

  @Column({ nullable: true })
  idInTable: number;

  @Column()
  userId: number;

  @Column()
  userName: string;

  @CreateDateColumn()
  createdAt: Date;
}
