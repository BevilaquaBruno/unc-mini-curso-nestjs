import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';

@Injectable()
export class PessoaService {

  constructor( @InjectRepository(Pessoa) private pessoaServiceRepository: Repository<Pessoa>) {}

  create(createPessoaDto: CreatePessoaDto) {
    return 'This action adds a new pessoa';
  }

  findAll(filtroPessoa) {
    return this.pessoaServiceRepository.find({
      take: filtroPessoa.limit,
      skip: filtroPessoa.page,
    });
  }

  findOne(id: number) {
    return this.pessoaServiceRepository.findOneBy({ id });
  }

  update(id: number, updatePessoaDto: UpdatePessoaDto) {
    return `This action updates a #${id} pessoa`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }
}
