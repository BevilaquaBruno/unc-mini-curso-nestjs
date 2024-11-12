[Voltar](../README.md)

# Aula 2 - Testando e alterando o controller básico do NestJs para rodar o projeto.

Para testar e entender o conceito do NestJs, vamos alterar alguns dados e entender a disposição dos arquivos. Os arquivos criados e suas funçoes são:

- **src/app.controller.ts:** Arquivo de controller que guardará a regra de negócio do software e retornará os dados ou erros com base no corpo da requisição do cliente.
- **src/app.service.ts:** Arquivo de "serviço" que guardará as requisições ao banco de dados, neste caso utilizaremos um ORM (_object relational mapper_) para controlar as requisições a base de dados futuramente.
- **src/app.module.ts:** Arquivo de módulo, guarda os controller, serviços, provedores e exportações de dados do módulo, geralmente existe um módulo para cada entidade do software.

Para realizar um teste e entender o funcionamento dos controllers, vamos adicionar o seguinte código no arquivo **app.controller.ts**.

```typescript
  @Get('/teste')
  getTeste(): string {
    return 'Este é um teste';
  }
```

O `@Get()` é um decorator para o NestJs identificar e criar um gatilho para o endpoint destacado, existem diversos decorators no NestJs, iremos utilizar alguns deles como o `@Get`, `@Post()`, `@Patch`, `@Delete()`.

Ao rodar o comando novamente com o comando `npm run start` e acessar a URL `localhost:3000/teste`, retornaremos  texto escrito no método `getTeste()`.

Fim da segunda aula, entendemos o funcionamento dos principais arquivos e testamos um endpoint.

# Referências
- [NestJs first steps](https://docs.nestjs.com/first-steps)
- [NestJs controllers](https://docs.nestjs.com/controllers)
