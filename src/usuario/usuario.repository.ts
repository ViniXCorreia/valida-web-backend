import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioEntity } from './entities/usuario.entity';

@Injectable()
export class UsuarioRepoService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepoService: Repository<UsuarioEntity>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {
    return await this.usuarioRepoService.create(createUsuarioDto);
  }

  async findById(id: number): Promise<UsuarioEntity> {
    return await this.usuarioRepoService.findOne({ where: { id: id } });
  }

  async findAll(): Promise<UsuarioEntity[]> {
    return await this.usuarioRepoService.find();
  }

  async findByEmail(email: string): Promise<UsuarioEntity> {
    return await this.usuarioRepoService.findOne({
      where: { email: email },
    });
  }

  async update(updateUsuarioDto: UpdateUsuarioDto): Promise<any> {
    return await this.usuarioRepoService.save(updateUsuarioDto);
  }

  async updatePassword(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<any> {
    return await this.usuarioRepoService.update(id, {
      password: updateUsuarioDto.password,
    });
  }

  async delete(id: number): Promise<boolean> {
    await this.usuarioRepoService.delete(id);
    return true;
  }
}
