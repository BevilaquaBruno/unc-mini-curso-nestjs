import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPessoaDto: CreatePessoaDto) {
    let pessoaExiste = await this.pessoaService.findOneByCpf(createPessoaDto.cpf);
    if(null != pessoaExiste)
      throw new HttpException(
        'Já existe uma pessoa com este CPF',
        HttpStatus.BAD_REQUEST,
      );

    return this.pessoaService.create(createPessoaDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const filtroPessoa = {
      page: null,
      limit: null,
    };

    filtroPessoa.limit = limit == undefined ? 5 : parseInt(limit);
    filtroPessoa.page =
      page == undefined ? 0 : filtroPessoa.limit * (parseInt(page) - 1);

    return {
      data: await this.pessoaService.findAll(filtroPessoa),
      config: {
        page: page,
        limit: limit
      }
    };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoaService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePessoaDto: UpdatePessoaDto) {
    let pessoaExiste = await this.pessoaService.getRepeatedPessoa(+id, updatePessoaDto.cpf);
    if(null != pessoaExiste)
      throw new HttpException(
        'Já existe uma pessoa com este CPF',
        HttpStatus.BAD_REQUEST,
      );

    return this.pessoaService.update(+id, updatePessoaDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoaService.remove(+id);
  }
}
