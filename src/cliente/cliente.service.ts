import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuditRepoService } from 'src/audit/audit.repository';
import { AuditService } from 'src/audit/audit.service';
import { CreateLogDto } from 'src/audit/dto/create-log.dto';
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
    private readonly auditService: AuditService,
  ) {}
  async create(
    reqUser: UsuarioEntity,
    createClienteDto: CreateClienteDto,
  ): Promise<ClienteEntity> {
    let findClient = await this.clienteRepoService.findByDocument(
      createClienteDto.document,
    );

    if (findClient) {
      throw new ConflictException('Já existe um cliente com esse documento!');
    }

    let createdClient = await this.clienteRepoService.create(createClienteDto);

    let auditItem = new CreateLogDto();
    auditItem.tableName = 'CLIENTE';
    auditItem.action = 'CREATE_CLIENTE';
    auditItem.idInTable = createdClient.id;
    auditItem.userId = reqUser.id;
    auditItem.userName = reqUser.name;

    await this.auditService.create(auditItem);

    return createdClient;
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
    reqUser: UsuarioEntity,
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<ClienteEntity> {
    let findClient = await this.clienteRepoService.findById(id);
    if (!findClient) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    await this.clienteRepoService.update(id, updateClienteDto);

    let auditItem = new CreateLogDto();
    auditItem.tableName = 'CLIENTE';
    auditItem.action = 'UPDATE_CLIENTE';
    auditItem.idInTable = findClient.id;
    auditItem.userId = reqUser.id;
    auditItem.userName = reqUser.name;

    await this.auditService.create(auditItem);

    return await this.clienteRepoService.findById(id);
  }

  async remove(reqUser: UsuarioEntity, id: number): Promise<boolean> {
    let findClient = await this.clienteRepoService.findById(id);
    if (!findClient) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    let auditItem = new CreateLogDto();
    auditItem.tableName = 'CLIENTE';
    auditItem.action = 'DELETE_CLIENTE';
    auditItem.idInTable = findClient.id;
    auditItem.userId = reqUser.id;
    auditItem.userName = reqUser.name;

    await this.auditService.create(auditItem);

    return await this.clienteRepoService.delete(id);
  }
}
