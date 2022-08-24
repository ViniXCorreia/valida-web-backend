import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cliente' })
export class ClienteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  document: string;
}
