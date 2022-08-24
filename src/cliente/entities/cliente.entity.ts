import { PropostaComercialEntity } from 'src/proposta-comercial/entities/proposta-comercial.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  //TODO RESPONSÁVEIS PELA EMPRESA

  @OneToMany(() => PropostaComercialEntity, (proposta) => proposta.cliente, {
    cascade: true,
  })
  propostas: PropostaComercialEntity[];
}
