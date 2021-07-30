import {
  Controller,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
  SerializeOptions,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { Game } from './entities/game.entity';
import { GamesService } from './games.service';
import { GROUP_GAME, GROUP_PUBLISHER } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { PatchGameDto } from './dto/patch-game.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

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
  async findGame(@Param('id') id: number): Promise<Game> {
    return this.gamesService.findOne(id);
  }

  @Get(':id/publisher')
  @SerializeOptions({
    groups: [GROUP_PUBLISHER],
  })
  async findGamePublisher(@Param('id') id: number): Promise<Game> {
    return this.gamesService.findOne(id);
  }

  @Post()
  async createGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.insert(createGameDto);
  }

  @Delete(':id')
  async deleteGame(@Param('id') id: number): Promise<DeleteResult> {
    return this.gamesService.delete(id);
  }

  @Patch(':id')
  async patchGame(
    @Param('id') id: number,
    @Body() patchGameDto: PatchGameDto,
  ): Promise<UpdateResult> {
    return this.gamesService.patch(id, patchGameDto);
  }
}
