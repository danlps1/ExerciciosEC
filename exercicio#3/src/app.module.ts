import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcaModule } from './modules/marca/marca.module';
import { VeiculoModule } from './modules/veiculo/veiculo.module';
import { CategoriaEntity } from './entity/categoria.entity';
import { MarcaEntity } from './entity/marca.entity';
import { VeiculoEntity } from './entity/veiculo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'dbmysql',
      database: 'agenciaDB',
      entities: [CategoriaEntity, MarcaEntity, VeiculoEntity],
      synchronize: true,
    }),
    MarcaModule,
    VeiculoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
