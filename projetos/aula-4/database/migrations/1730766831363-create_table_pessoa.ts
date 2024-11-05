import { MigrationInterface, QueryRunner } from "typeorm"

export class createTablePessoa1730766831363 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE pessoa (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(50) NOT NULL,
                cpf CHAR(11)
            );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE pessoa;`);
    }

}
