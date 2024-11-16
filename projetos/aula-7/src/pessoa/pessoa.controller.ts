import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { log } from 'console';

@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoaService.update(+id, updatePessoaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoaService.remove(+id);
  }
}
