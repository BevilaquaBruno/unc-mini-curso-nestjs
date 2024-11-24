import { Pessoa } from "src/pessoa/entities/pessoa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ select: false, nullable: true })
  password: string;

  @ManyToOne(() => Pessoa, { eager: true })
  @JoinColumn({ foreignKeyConstraintName: 'FK_pessoa_usuario' })
  pessoa: Pessoa;

}
