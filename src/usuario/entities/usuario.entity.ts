import { ClienteEntity } from 'src/cliente/entities/cliente.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEnum } from '../enum/usuario.enum';

@Entity({ name: 'usuario' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  type: UsuarioEnum;

  @OneToMany(() => ClienteEntity, (clientes) => clientes.internalResponsible, {
    eager: true,
  })
  clientes: ClienteEntity[];
}
