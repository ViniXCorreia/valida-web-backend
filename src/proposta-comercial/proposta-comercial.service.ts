import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuditService } from 'src/audit/audit.service';
import { CreateLogDto } from 'src/audit/dto/create-log.dto';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { CreatePropostaComercialDto } from './dto/create-proposta-comercial.dto';
import { UpdatePropostaComercialDto } from './dto/update-proposta-comercial.dto';
import { PropostaComercialEntity } from './entities/proposta-comercial.entity';
import { PropostaComercialRepoService } from './proposta-comercial.repository';

@Injectable()
export class PropostaComercialService {
  constructor(
    @Inject(PropostaComercialRepoService)
    private propostaComercialRepoService: PropostaComercialRepoService,
    private readonly auditService: AuditService,
  ) {}
  async create(
    reqUser: UsuarioEntity,
    createPropostaComercialDto: CreatePropostaComercialDto,
  ): Promise<PropostaComercialEntity> {
    let createdProposta = await this.propostaComercialRepoService.create(
      createPropostaComercialDto,
    );

    let auditItem = new CreateLogDto();
    auditItem.tableName = 'PROPOSTA-COMERCIAL';
    auditItem.action = 'CREATE_PRPOSTA';
    auditItem.idInTable = createdProposta.id;
    auditItem.userId = reqUser.id;
    auditItem.userName = reqUser.name;

    await this.auditService.create(auditItem);

    return createdProposta;
  }

  async findAll(): Promise<PropostaComercialEntity[]> {
    return await this.propostaComercialRepoService.findAll();
  }

  async findOne(id: number): Promise<PropostaComercialEntity> {
    let findProposta = await this.propostaComercialRepoService.findOneById(id);
    if (!findProposta) {
      throw new NotFoundException('Proposta Comercial não encontrada!');
    }
    return findProposta;
  }

  async update(
    reqUser: UsuarioEntity,
    id: number,
    updatePropostaComercialDto: UpdatePropostaComercialDto,
  ): Promise<PropostaComercialEntity> {
    let findProposta = await this.propostaComercialRepoService.findOneById(id);
    if (!findProposta) {
      throw new NotFoundException('Proposta Comercial não encontrada!');
    }

    let auditItem = new CreateLogDto();
    auditItem.tableName = 'PROPOSTA-COMERCIAL';
    auditItem.action = 'UPDATE_PROPOSTA';
    auditItem.idInTable = findProposta.id;
    auditItem.userId = reqUser.id;
    auditItem.userName = reqUser.name;

    await this.auditService.create(auditItem);

    return await this.propostaComercialRepoService.update(
      id,
      updatePropostaComercialDto,
    );
  }

  async remove(reqUser: UsuarioEntity, id: number): Promise<boolean> {
    let findProposta = await this.propostaComercialRepoService.findOneById(id);
    if (!findProposta) {
      throw new NotFoundException('Proposta Comercial não encontrada!');
    }

    let auditItem = new CreateLogDto();
    auditItem.tableName = 'PROPOSTA-COMERCIAL';
    auditItem.action = 'DELETE_PROPOSTA';
    auditItem.idInTable = findProposta.id;
    auditItem.userId = reqUser.id;
    auditItem.userName = reqUser.name;

    await this.auditService.create(auditItem);

    return await this.propostaComercialRepoService.delete(id);
  }

  async getPropopostasByCliendId(
    id: number,
  ): Promise<PropostaComercialEntity[]> {
    let findPropostas =
      await this.propostaComercialRepoService.getPropostasByCliendId(id);
    if (findPropostas.length === 0) {
      throw new NotFoundException('Não existem propostas para este cliente!');
    }

    return findPropostas;
  }
}
