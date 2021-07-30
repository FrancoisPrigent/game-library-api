import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { MoreThan, Repository } from 'typeorm';
import { Game } from '../entities/game.entity';
import { GamesService } from '../games.service';

const RELEASE_DATE_MAXIMUM_MONTH_RANGE = 18;

@Injectable()
export class RemoveGamesService {
  private readonly logger = new Logger(RemoveGamesService.name);

  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    private gameService: GamesService,
  ) {}

  @Cron('5 * * * * *')
  async removeOldGames(): Promise<void> {
    this.logger.log(`Task scheduling triggered`);
    const games = await this.getGamesToRemove();
    games.map((game) => {
      this.gameService.delete(game.id);
    }, this);
  }

  async getGamesToRemove(): Promise<Game[]> {
    const games = await this.gameRepository.find({
      where: {
        releaseDate: MoreThan(
          moment().add(RELEASE_DATE_MAXIMUM_MONTH_RANGE, 'M').format(),
        ),
      },
    });

    return games;
  }
}
