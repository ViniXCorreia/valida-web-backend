import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { updatePasswordDto } from './dto/update-password.dto';
import { LocalAuthGuard } from 'src/auth/shared/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';

@Controller()
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/usuario')
  create(@Body() createUsuarioDto: CreateUsuarioDto, @Request() req: any) {
    const reqUser = req.user;
    return this.usuarioService.create(reqUser, createUsuarioDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/usuario/login')
  async login(@Request() req: any) {
    return await this.usuarioService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/usuarios')
  findAll() {
    return this.usuarioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/usuario/email')
  findEmail(@Body() email: string) {
    return this.usuarioService.findByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/usuario/:id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/usuario/:id')
  update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Request() req,
  ) {
    const reqUser = req.user;
    return this.usuarioService.update(reqUser, +id, updateUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/usuario/:id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: updatePasswordDto,
    @Request() req,
  ) {
    const reqUser = req.user;
    return this.usuarioService.updatePasword(reqUser, +id, updatePasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/usuario/:id')
  remove(@Param('id') id: string, @Request() req) {
    const reqUser = req.user;
    return this.usuarioService.remove(reqUser, +id);
  }
}
