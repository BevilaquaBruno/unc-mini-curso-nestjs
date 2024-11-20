import { IsNotEmpty, IsString, Matches, ValidateIf } from "class-validator";

export class CreatePessoaDto {

  @IsString({ message: 'Informe o nome da pessoa' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @ValidateIf((pessoa) => pessoa.cpf !== null)
  @IsString({ message: 'Informe novamente o CPF da pessoa' })
  @Matches(/\d{3}.\d{3}.\d{3}-\d{2}/g, { message: 'CPF inválido' })
  cpf: string;
}
