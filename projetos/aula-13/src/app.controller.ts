import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/teste/:id')
  getTeste(@Param('id') id: string): string {
    //transforma o id em inteiro
    let int_id = +id;

    //verifica se o id é NaN (not a number) e retorna erro caso seja
    if(Number.isNaN(int_id)){
      throw new HttpException(
        'O id deve ser um inteiro, id informado: ' + id,
        HttpStatus.BAD_REQUEST,
      );
    }

    return 'Este é um teste, o id informado foi: ' + id;
  }

  @Get('/teste2')
  getTeste2(
    @Query('lista_nomes') lista_nomes: string,
    @Query('lista_idades') lista_idades: string
  ): string {
    return 'Esta é a rota do teste2, a lista de nomes é: ' + lista_nomes + ' e a lista de idades é: ' + lista_idades;
  }
}
