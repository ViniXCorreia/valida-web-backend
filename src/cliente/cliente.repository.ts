import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteEntity } from './entities/cliente.entity';

@Injectable()
export class ClienteRepoService {
  constructor(
    @InjectRepository(ClienteEntity)
    private clienteRepository: Repository<ClienteEntity>,
  ) {}

  async create(clienteDto: CreateClienteDto): Promise<ClienteEntity> {
    return await this.clienteRepository.save(clienteDto);
  }

  async findById(id: number): Promise<ClienteEntity> {
    return await this.clienteRepository.findOne({ where: { id: id } });
  }

  async findAll(): Promise<ClienteEntity[]> {
    return await this.clienteRepository.find();
  }

  async findByDocument(document: string): Promise<ClienteEntity> {
    return await this.clienteRepository.findOne({
      where: { document: document },
    });
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.clienteRepository.delete(id);
      return true;
    } catch (error) {
      throw error.message();
    }
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<ClienteEntity> {
    let updateClient = new ClienteEntity();
    updateClient = Object.assign(updateClient, updateClienteDto);
    await this.clienteRepository.update(id, updateClient);
    return await this.findById(id);
  }
}
