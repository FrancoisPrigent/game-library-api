import { Injectable } from '@nestjs/common';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { PatchGameDto } from './dto/patch-game.dto';
import { Publisher } from './entities/publisher.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(Publisher)
    private publisherRepository: Repository<Publisher>,
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

  async delete(id: number): Promise<DeleteResult> {
    return await this.gameRepository.delete(id);
  }

  async patch(id: number, patchGameDto: PatchGameDto): Promise<UpdateResult> {
    return await this.gameRepository.update(id, patchGameDto);
  }

  async putPublisher(id: number, publisherId: number): Promise<Game> {
    const game = await this.findOne(id);
    const publisher = await this.publisherRepository.findOne(publisherId);
    if (game && publisher) {
      game.publisher = publisher;
    }

    return await this.gameRepository.save(game);
  }
}
