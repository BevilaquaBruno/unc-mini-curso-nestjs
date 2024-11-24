import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUsuarioDto) {
    if (createUserDto.password != createUserDto.verify_password) {
      throw new HttpException(
        'As senhas devem ser iguais',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userAlreadyExists = await this.usuarioService.findByEmail(
      createUserDto.email,
    );

    if (userAlreadyExists?.email != undefined) {
      throw new HttpException(
        'Já existe um usuário com esse e-mail cadastrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.usuarioService.create(createUserDto);

    return this.usuarioService.findOne(newUser.id);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const filtroUsuario = {
      page: null,
      limit: null,
    };

    filtroUsuario.limit = limit == undefined ? 5 : parseInt(limit);
    filtroUsuario.page =
      page == undefined ? 0 : filtroUsuario.limit * (parseInt(page) - 1);

    return {
      data: await this.usuarioService.findAll(filtroUsuario),
      config: {
        page: page,
        limit: limit
      }
    };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    delete updateUsuarioDto.password;
    delete updateUsuarioDto.verify_password;

    let usuarioExiste = await this.usuarioService.getRepeatedUsuario(+id, updateUsuarioDto.email);
    if (null != usuarioExiste)
      throw new HttpException(
        'Já existe um usuário com este e-mail',
        HttpStatus.BAD_REQUEST,
      );

    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
