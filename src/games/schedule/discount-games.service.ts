import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Between, IsNull, Repository } from 'typeorm';
import { Game } from '../entities/game.entity';
import { GamesService } from '../games.service';

const RELEASE_DATE_MINIMUM_MONTH_RANGE = 12;
const RELEASE_DATE_MAXIMUM_MONTH_RANGE = 18;

@Injectable()
export class DiscountGameService {
  private readonly logger = new Logger(DiscountGameService.name);

  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    private gameService: GamesService,
  ) {}

  @Cron('5 * * * * *')
  async discountGame(): Promise<void> {
    this.logger.log(`Task scheduling triggered`);
    const games = await this.getDiscountableGames();
    games.map((game) => {
      game.discount = 20;
      this.gameService.patch(game.id, game);
    }, this);
  }

  async getDiscountableGames(): Promise<Game[]> {
    const games = await this.gameRepository.find({
      where: {
        discount: IsNull(),
        releaseDate: Between(
          this.getDateRange(RELEASE_DATE_MINIMUM_MONTH_RANGE),
          this.getDateRange(RELEASE_DATE_MAXIMUM_MONTH_RANGE),
        ),
      },
    });

    return games;
  }

  getDateRange(rangeInMonth: number): string {
    return moment().add(rangeInMonth, 'M').format();
  }
}
