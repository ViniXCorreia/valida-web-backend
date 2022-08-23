import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropostaComercialService } from './proposta-comercial.service';
import { CreatePropostaComercialDto } from './dto/create-proposta-comercial.dto';
import { UpdatePropostaComercialDto } from './dto/update-proposta-comercial.dto';

@Controller('proposta-comercial')
export class PropostaComercialController {
  constructor(private readonly propostaComercialService: PropostaComercialService) {}

  @Post()
  create(@Body() createPropostaComercialDto: CreatePropostaComercialDto) {
    return this.propostaComercialService.create(createPropostaComercialDto);
  }

  @Get()
  findAll() {
    return this.propostaComercialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propostaComercialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropostaComercialDto: UpdatePropostaComercialDto) {
    return this.propostaComercialService.update(+id, updatePropostaComercialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propostaComercialService.remove(+id);
  }
}
