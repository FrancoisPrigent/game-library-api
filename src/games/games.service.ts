import { Injectable } from '@nestjs/common';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async findAll(): Promise<Game[]> {
    return await this.gameRepository.find({ relations: ['publisher'] });
  }

  async findOne(id: number): Promise<Game> {
    return await this.gameRepository.findOne(id, { relations: ['publisher'] });
  }

  async insert(createGameDto: CreateGameDto): Promise<Game> {
    const game = this.gameRepository.create(createGameDto);
    return await this.gameRepository.save(game);
  }
}
