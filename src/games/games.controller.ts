import {
  Controller,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
  SerializeOptions,
  Param,
} from '@nestjs/common';
import { Game } from './entities/game.entity';
import { GamesService } from './games.service';
import { GROUP_GAME, GROUP_PUBLISHER } from './entities/game.entity';

@Controller('games')
@UseInterceptors(ClassSerializerInterceptor)
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  @SerializeOptions({
    groups: [GROUP_GAME],
  })
  async findAll(): Promise<Game[]> {
    return this.gamesService.findAll();
  }

  @Get(':id')
  @SerializeOptions({
    groups: [GROUP_GAME],
  })
  async findGame(@Param('id') id: string): Promise<Game> {
    return this.gamesService.findOne(id);
  }

  @Get(':id/publisher')
  @SerializeOptions({
    groups: [GROUP_PUBLISHER],
  })
  async findGamePublisher(@Param('id') id: string): Promise<Game> {
    return this.gamesService.findOne(id);
  }
}
