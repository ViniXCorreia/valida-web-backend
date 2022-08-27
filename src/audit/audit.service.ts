import { Inject, Injectable } from '@nestjs/common';
import { AuditRepoService } from './audit.repository';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class AuditService {
  constructor(
    @Inject(AuditRepoService)
    private auditRepoService: AuditRepoService,
  ) {}

  async create(createLogtDto: CreateLogDto) {
    await this.auditRepoService.createLog(createLogtDto);
  }
}
