[Voltar](../README.md)

# Aula 12 - Finalização do CRUD de usuário, edição e testes finais.

### Edição no Service
Para a edição do cadastro de usuário, devemos alterar os arquivos `usuario.service.ts` e `usuario.controller.ts`.

No arquivo `usuario.service.ts` iremos editar o método **update**, que deverá ficar da seguinte forma:

```typescript
...
update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
  return this.usuarioServiceRepository.update(id, updateUsuarioDto);
}
...
```

### Validação de usuário já cadastrado

Necessitamos, assim como na criação, a validação se esse usuário que está sendo editado teve seu e-mail alterado e informado o e-mail de outro usuário já existente.

Para isso vamos adicionar um novo método dentro do arquivo `usuario.service.ts`, ficando da seguinte forma:

```typescript
import { ..., Not } from 'typeorm';
...
getRepeatedUsuario(id: number, email: string) {
  return this.usuarioServiceRepository.findOneBy({
    email: email,
    id: Not(id),
  });
}
...
```

Este método usa uma função do TypeORM **not** que usamos lá no CRUD de pessoa.

No arquivo `usuario.controller.ts` podemos usar este método para validar a alteração no cadastro do usuário alterando o método **update**.

```typescript
...
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
...
```

Para testarmos, incluí um novo usuário e dessa forma, executando uma URL no **Bruno** para tentar editar um registro inserindo o CPF que já existe em outro registro, irá retornar uma mensagem de erro, conforme observado:

![Retorno do cadastro](../images/aula-12/1_retorno_usebruno.png)

Fim da aula 12, terminamos o CRUD do usuário e testamos a edição do usuário com uma validação.

# Referências
- [Projeto pessoal libevilaqua](https://github.com/BevilaquaBruno/libevilaqua-backend-nest)
- [TypeORM Find Options](https://orkhan.gitbook.io/typeorm/docs/find-options)
