/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { createTablePessoa1730766831363 } from './migrations/1730766831363-create_table_pessoa';
import { CreateTableUsuario1732132768859 } from './migrations/1732132768859-create_table_usuario';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env['DB_HOST'],
  port: Number(process.env['DB_PORT']),
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_DATABASE'],
  migrations: [createTablePessoa1730766831363, CreateTableUsuario1732132768859],
  migrationsTableName: 'migrations',
});
