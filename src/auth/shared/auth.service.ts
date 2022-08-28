import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsuarioService))
    private userService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UsuarioEntity> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === password) {
      const { id, name, email } = user;
      return user;
    }

    return null;
  }

  async login(user: UsuarioEntity): Promise<string> {
    return await this.jwtService.signAsync({ user });
  }
}
