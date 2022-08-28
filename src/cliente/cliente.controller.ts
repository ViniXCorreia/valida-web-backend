import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller()
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/client')
  create(@Body() createClienteDto: CreateClienteDto, @Request() req) {
    const reqUser = req.userId;
    return this.clienteService.create(createClienteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/clients')
  findAll() {
    return this.clienteService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/client/:id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/client/:id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/client/:id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }
}
