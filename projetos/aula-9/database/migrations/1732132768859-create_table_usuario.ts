import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsuario1732132768859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE usuario (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(255),
                id_pessoa INT,

                CONSTRAINT FK_pessoa_usuario FOREIGN KEY (id_pessoa) REFERENCES pessoa(id)
            );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE usuario;`);

    }

}
