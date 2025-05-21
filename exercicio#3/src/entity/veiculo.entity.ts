import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoriaEntity } from './categoria.entity';
import { MarcaEntity } from './marca.entity';

@Entity('tb_veiculo')
export class VeiculoEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cor: string;

  @Column()
  ano: number;

  @ManyToOne(() => CategoriaEntity, (categoria) => categoria.veiculos)
  categoria: CategoriaEntity;

  @ManyToOne(() => MarcaEntity, (marca) => marca.veiculos)
  marca: MarcaEntity;
}
