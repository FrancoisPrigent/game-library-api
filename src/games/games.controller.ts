import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { GamesService } from './games.service';
import { Game } from './interfaces/game.interface';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post('game')
  async create(@Body() createGameDto: CreateGameDto) {
    this.gamesService.create(createGameDto);
  }

  @Get('games')
  async findAll(): Promise<Game[]> {
    return this.gamesService.findAll();
  }
}
