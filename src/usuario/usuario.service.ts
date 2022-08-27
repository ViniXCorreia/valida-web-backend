import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { FindByEmailDto } from './dto/find-by-email.dto';
import { updatePasswordDto } from './dto/update-password.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioRepoService } from './usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject(UsuarioRepoService)
    private readonly usuarioRepoService: UsuarioRepoService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {
    let findUser = await this.usuarioRepoService.findByEmail(
      createUsuarioDto.email,
    );
    if (findUser) {
      throw new ConflictException('Este usuário já existe na base de dados!');
    }
    const crypto = require('crypto');
    const sha256Hash = crypto.createHash('sha256');
    const hashPassword = sha256Hash
      .update(createUsuarioDto.password)
      .digest('hex');
    createUsuarioDto.password = hashPassword;
    return await this.usuarioRepoService.create(createUsuarioDto);
  }

  async findAll(): Promise<UsuarioEntity[]> {
    return await this.usuarioRepoService.findAll();
  }

  async findOne(id: number): Promise<UsuarioEntity> {
    let findUser = await this.usuarioRepoService.findById(id);
    if (!findUser) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return findUser;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<any> {
    let findUser = await this.usuarioRepoService.findById(id);
    if (!findUser) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    return await this.usuarioRepoService.update(findUser.id, updateUsuarioDto);
  }

  async findByEmail(findByEmail: FindByEmailDto): Promise<UsuarioEntity> {
    let findUser = await this.usuarioRepoService.findByEmail(findByEmail.email);
    if (!findUser) {
      throw new NotFoundException('Usuario não encontrado!');
    }
    return findUser;
  }

  async updatePasword(id: number, updatePasswordDto: updatePasswordDto) {
    let findUser = await this.usuarioRepoService.findById(id);
    if (findUser) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    return await this.usuarioRepoService.updatePassword(id, updatePasswordDto);
  }

  async remove(id: number): Promise<boolean> {
    let findUser = await this.usuarioRepoService.findById(id);
    if (findUser) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    return await this.usuarioRepoService.delete(id);
  }
}
