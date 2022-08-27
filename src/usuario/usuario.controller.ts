import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { updatePasswordDto } from './dto/update-password.dto';
import { FindByEmailDto } from './dto/find-by-email.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('/usuario')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Post('/usuario/login')
  login(@Body() loginDto: LoginDto) {
    return this.usuarioService.login(loginDto);
  }

  @Get('/usuarios')
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get('/usuario/email')
  findEmail(@Body() email: FindByEmailDto) {
    return this.usuarioService.findByEmail(email);
  }

  @Get('/usuario/:id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Put('/usuario/:id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Patch('/usuario/:id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: updatePasswordDto,
  ) {
    return this.usuarioService.updatePasword(+id, updatePasswordDto);
  }

  @Delete('/usuario/:id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
