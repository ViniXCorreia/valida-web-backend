import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropostaComercialEntity } from 'src/proposta-comercial/entities/proposta-comercial.entity';
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
		return await this.clienteRepository.findOne({
			relations: ['internalResponsible'],
			where: { id: id },
		});
	}

	async findAll(): Promise<ClienteEntity[]> {
		return await this.clienteRepository.find({
			relations: ['internalResponsible'],
		});
	}

	async findByDocument(document: string): Promise<ClienteEntity> {
		return await this.clienteRepository.findOne({
			relations: ['internalResponsible'],
			where: { document: document },
		});
	}

	async delete(id: number): Promise<boolean> {
		await this.clienteRepository.delete(id);
		return true;
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
