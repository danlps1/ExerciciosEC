import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VeiculoEntity } from './veiculo.entity';

@Entity('tb_marca')
export class MarcaEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => VeiculoEntity, (veiculo) => veiculo.marca)
  veiculos: VeiculoEntity[];
}
