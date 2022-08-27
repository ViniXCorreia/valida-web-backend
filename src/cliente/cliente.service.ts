import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { UsuarioRepoService } from 'src/usuario/usuario.repository';
import { ClienteRepoService } from './cliente.repository';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteEntity } from './entities/cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @Inject(ClienteRepoService)
    private readonly clienteRepoService: ClienteRepoService,
  ) {}
  async create(createClienteDto: CreateClienteDto): Promise<ClienteEntity> {
    let findClient = await this.clienteRepoService.findByDocument(
      createClienteDto.document,
    );

    if (findClient) {
      throw new ConflictException('Já existe um cliente com esse documento!');
    }

    return await this.clienteRepoService.create(createClienteDto);
  }

  async findAll(): Promise<ClienteEntity[]> {
    let result = await this.clienteRepoService.findAll();
    if (result.length === 0) {
      throw new NotFoundException('Não existem Clientes Cadastrados!');
    }
    return result;
  }

  async findOne(id: number): Promise<ClienteEntity> {
    let findClient = await this.clienteRepoService.findById(id);
    if (!findClient) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    return findClient;
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<ClienteEntity> {
    let findClient = await this.clienteRepoService.findById(id);
    if (!findClient) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    await this.clienteRepoService.update(id, updateClienteDto);

    return await this.clienteRepoService.findById(id);
  }

  async remove(id: number): Promise<boolean> {
    let findClient = await this.clienteRepoService.findById(id);
    if (!findClient) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    return await this.clienteRepoService.delete(id);
  }
}
