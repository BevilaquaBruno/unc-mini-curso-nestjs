[Voltar](../README.md)

# Aula 6 - Criação de paginação para retornar a lista de pessoas.

Em uma API, de vez em quando é necessário que a lista seja retornada em partes e não todos os dados, portanto nesta aula vamos aplicar o conceito de paginação na lista de pessoas.

primeiramente é necessário alterar o método `findall` do arquivo `pessoa.controller.ts`, este método deverá ficar da seguinte forma:

```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, } from '@nestjs/common';
...
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
...
```

Neste trecho utilizamos o **decorator** `Query` para receber a página (page) e a quantidade de itens por página (limit), isso é guardado em uma variável (filtroPessoa) e é passado para o método `findAll` do serviço de pessoa.

No arquivo `pessoa.service.ts` devemos atualizar o método `findAll` para receber as novas variáveis.

```typescript
...
findAll(filtroPessoa) {
  return this.pessoaServiceRepository.find({
    take: filtroPessoa.limit,
    skip: filtroPessoa.page,
  });
}
...
```

Agora para testar isso é necessário rodar o projeto com o comando `npm run start` e testar com a URL `http://localhost:3000/pessoa?page=1&limit=1` no Bruno. Nesta URL, o parâmetro `page` indica a página que você está requisitanco e o parâmetro `limit` indica a quantidade máxima de registros por página.

Neste exemplo acima, o retorno será:

![Retorno](../images/aula-6/1_retorno_API.PNG)


Fim da aula 6, conseguimos criar a paginação, você pode incluir registros na tabela de pessoa e alterar os parâmetros `page` e `limit`.

# Referências
- [Projeto pessoal libevilaqua](https://github.com/BevilaquaBruno/libevilaqua-backend-nest)
- [Documentação NestJs](https://docs.nestjs.com/)
- [Bruno API Helper](https://www.usebruno.com/)