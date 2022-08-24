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
    return await this.clienteRepository.create(clienteDto);
  }

  async findById(id: number): Promise<ClienteEntity> {
    return await this.clienteRepository.findOne({ where: { id: id } });
  }

  async findAll(): Promise<ClienteEntity[]> {
    return await this.clienteRepository.find();
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.clienteRepository.delete(id);
      return true;
    } catch (error) {
      throw error.message();
    }
  }

  async update(updateClienteDto: UpdateClienteDto): Promise<any> {
    return this.clienteRepository.save(updateClienteDto);
  }
}
