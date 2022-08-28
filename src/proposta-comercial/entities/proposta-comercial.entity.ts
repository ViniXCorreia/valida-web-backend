import { ClienteEntity } from 'src/cliente/entities/cliente.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'proposta-comercial' })
export class PropostaComercialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createDate: Date;

  @Column()
  status: string;

  @ManyToOne(() => ClienteEntity, (cliente) => cliente.propostas, {
    onDelete: 'CASCADE',
  })
  cliente: ClienteEntity;
}
