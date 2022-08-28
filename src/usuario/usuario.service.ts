import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuditRepoService } from 'src/audit/audit.repository';
import { CreateLogDto } from 'src/audit/dto/create-log.dto';
import { AuthService } from 'src/auth/shared/auth.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { FindByEmailDto } from './dto/find-by-email.dto';
import { LoginUserResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { updatePasswordDto } from './dto/update-password.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioRepoService } from './usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject(UsuarioRepoService)
    private readonly usuarioRepoService: UsuarioRepoService,
    @Inject(AuditRepoService)
    private readonly auditRepoService: AuditRepoService,
    private authService: AuthService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {
    let findUser = await this.usuarioRepoService.findByEmail(
      createUsuarioDto.email,
    );
    if (findUser) {
      throw new ConflictException('Este usuário já existe na base de dados!');
    }
    const hashPassword = await this.hasher(createUsuarioDto.password);
    createUsuarioDto.password = hashPassword;

    let auditItem = new CreateLogDto();
    auditItem.tableName = 'USUARIO';
    auditItem.action = 'CREATE_USER';
    auditItem.idTable = null;

    return await this.usuarioRepoService.create(createUsuarioDto);
  }

  async login(loginUser: UsuarioEntity): Promise<LoginUserResponseDto> {
    const accessToken: string = await this.authService.login(loginUser);
    return { accessToken };
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

  async findByEmail(email: string): Promise<UsuarioEntity> {
    let findUser = await this.usuarioRepoService.findByEmail(email);
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

    if (findUser.clientes.length > 0) {
      throw new UnauthorizedException(
        'Não é possível excluir usuário responsável por clientes!',
      );
    }
    return await this.usuarioRepoService.delete(id);
  }

  hasher(text: string): Promise<string> {
    const crypto = require('crypto');
    const sha256Hash = crypto.createHash('sha256');
    const hashPassword = sha256Hash.update(text).digest('hex');
    return hashPassword;
  }
}
