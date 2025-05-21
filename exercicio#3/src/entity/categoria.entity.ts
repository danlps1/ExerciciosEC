import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VeiculoEntity } from './veiculo.entity';

export enum tipoCategoria {
  MOTOCICLETA = 'MOTOCICLETA',
  CARRO = 'CARRO',
  CAMINHAO = 'CAMINHAO',
}

@Entity('tb_categoria')
export class CategoriaEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: tipoCategoria,
  })
  tipo: tipoCategoria;

  @OneToMany(() => VeiculoEntity, (veiculo) => veiculo.categoria)
  veiculos: VeiculoEntity[];
}
