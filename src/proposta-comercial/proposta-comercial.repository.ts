import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropostaComercialDto } from './dto/create-proposta-comercial.dto';
import { UpdatePropostaComercialDto } from './dto/update-proposta-comercial.dto';
import { PropostaComercialEntity } from './entities/proposta-comercial.entity';

@Injectable()
export class PropostaComercialRepoService {
	constructor(
		@InjectRepository(PropostaComercialEntity)
		private propostaComercialRepoService: Repository<PropostaComercialEntity>,
	) {}

	async create(
		createPropostaComercialDto: CreatePropostaComercialDto,
	): Promise<PropostaComercialEntity> {
		return await this.propostaComercialRepoService.save(
			createPropostaComercialDto,
		);
	}

	async findOneById(id: number): Promise<PropostaComercialEntity> {
		return await this.propostaComercialRepoService.findOne({
			relations: ['cliente'],
			where: { id: id },
		});
	}

	async findAll(): Promise<PropostaComercialEntity[]> {
		return await this.propostaComercialRepoService.find({
			relations: ['cliente'],
		});
	}

	async update(
		id: number,
		updatePropostaComercialDto: UpdatePropostaComercialDto,
	): Promise<PropostaComercialEntity> {
		let updateProposta = new PropostaComercialEntity();
		updateProposta = Object.assign(
			updateProposta,
			updatePropostaComercialDto,
		);

		await this.propostaComercialRepoService.update(id, updateProposta);

		return await this.findOneById(id);
	}

	async delete(id: number): Promise<boolean> {
		await this.propostaComercialRepoService.delete(id);
		return true;
	}

	async getPropostasByCliendId(
		id: number,
	): Promise<PropostaComercialEntity[]> {
		return await this.propostaComercialRepoService.find({
			relations: ['cliente'],
			where: { cliente: id },
		});
	}
}
