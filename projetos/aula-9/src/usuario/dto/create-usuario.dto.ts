import { IsEmail, Length } from "class-validator";
import { CreatePessoaDto } from "src/pessoa/dto/create-pessoa.dto";

export class CreateUsuarioDto {

  Pessoa: CreatePessoaDto;

  @IsEmail({}, { message: 'Informe um e-mail válido' })
  @Length(7, 50, { message: 'Informe um e-mail válido' })
  email: string;

  password: string;
  verify_password: string;
}
