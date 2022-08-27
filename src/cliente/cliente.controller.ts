import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller()
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('/client')
  create(@Body() createClienteDto: CreateClienteDto, @Request() req) {
    const reqUser = req.userId;
    return this.clienteService.create(createClienteDto);
  }

  @Get('/clients')
  findAll() {
    return this.clienteService.findAll();
  }

  @Get('/client/:id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @Patch('/client/:id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Delete('/client/:id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }
}
