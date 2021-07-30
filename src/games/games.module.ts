import { Module } from '@nestjs/common';
import { Game } from './entities/game.entity';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './entities/publisher.entity';
import { DiscountGameService } from './schedule/discount-games.service';
import { RemoveGamesService } from './schedule/remove-games.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Publisher])],
  controllers: [GamesController],
  providers: [GamesService, DiscountGameService, RemoveGamesService],
})
export class GamesModule {}
