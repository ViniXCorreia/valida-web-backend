import { PropostaComercialEntity } from 'src/proposta-comercial/entities/proposta-comercial.entity';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'cliente' })
export class ClienteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  document: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  responsiblePerson: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.clientes)
  internalResponsible: UsuarioEntity;

  @OneToMany(() => PropostaComercialEntity, (proposta) => proposta.cliente)
  propostas: PropostaComercialEntity[];
}
