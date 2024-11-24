import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioServiceRepository: Repository<Usuario>,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioServiceRepository.save(createUsuarioDto);
  }

  findAll(filtroUsuario) {
    return this.usuarioServiceRepository.find({
      take: filtroUsuario.limit,
      skip: filtroUsuario.page,
    });
  }

  findOne(id: number) {
    return this.usuarioServiceRepository.findOneBy({ id });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioServiceRepository.update(id, updateUsuarioDto);
  }

  async remove(id: number) {
    return await this.usuarioServiceRepository.delete({ id });
  }

  findByEmail(email: string) {
    return this.usuarioServiceRepository.findOne({
      select: {
        id: true,
        email: true,
        password: true,
        pessoa: {
          id: true,
          nome: true,
          cpf: true
        }
      },
      where: {
        email: email,
      },
    });
  }

  getRepeatedUsuario(id: number, email: string) {
    return this.usuarioServiceRepository.findOneBy({
      email: email,
      id: Not(id),
    });
  }
}
