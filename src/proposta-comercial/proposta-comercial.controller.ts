import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PropostaComercialService } from './proposta-comercial.service';
import { CreatePropostaComercialDto } from './dto/create-proposta-comercial.dto';
import { UpdatePropostaComercialDto } from './dto/update-proposta-comercial.dto';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';

@Controller('proposta-comercial')
export class PropostaComercialController {
  constructor(
    private readonly propostaComercialService: PropostaComercialService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createPropostaComercialDto: CreatePropostaComercialDto,
    @Request() req,
  ) {
    const reqUser = req.user;
    return this.propostaComercialService.create(
      reqUser,
      createPropostaComercialDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.propostaComercialService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propostaComercialService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropostaComercialDto: UpdatePropostaComercialDto,
    @Request() req,
  ) {
    const reqUser = req.user;
    return this.propostaComercialService.update(
      reqUser,
      +id,
      updatePropostaComercialDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const reqUser = req.user;
    return this.propostaComercialService.remove(reqUser, +id);
  }
}
