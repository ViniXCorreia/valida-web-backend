import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
