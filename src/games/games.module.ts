import { Module } from '@nestjs/common';
import { Game } from './entities/game.entity';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './entities/publisher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Publisher])],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
