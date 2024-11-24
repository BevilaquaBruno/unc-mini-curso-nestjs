[Voltar](../README.md)

# Aula 15 - Finalização do minicurso e observações.

Chegamos ao fim do minicurso de NestJs. Criamos dois CRUDs, um para pessoa e outro para usuários. Também criamos um endpoint para o login que retorna um token, com este token tudo pode ser feito no sistema, sem ele todos os endpoints ficam inacessíveis.

Acesse as referências no fim de cada aula, foram elas que foram usadas como base para a criação deste material. O principal material foi a minha [biblioteca pessoal](https://github.com/BevilaquaBruno/libevilaqua-backend-nest) que criei, tudo o que criei aqui usei lá como base, pois já sei que funciona.

O token de login tem a duração de **86400 segundos**, isto pode ser alterado na parte: 
```typescript
...
signOptions: { expiresIn: '86400s' },
...
```
dentro do arquivo `auth.module.ts`.

Outro detalhe é que foi utilizado o MySQL, mas como usamos o TypeORM, basta alterar no próprio TypeORM e nas migrations para mudar o SGBD.

Lembrando que existem os projetos de cada aula na pasta de **projetos**.
