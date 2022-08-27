import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditRepoService } from './audit.repository';
import { AuditService } from './audit.service';
import { AuditEntity } from './entities/audit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditEntity])],
  providers: [AuditService, AuditRepoService],
  exports: [AuditService, AuditRepoService],
})
export class AuditModule {}
