import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Publisher } from './publisher.entity';
import { Expose } from 'class-transformer';

export const GROUP_GAME = 'group_game';
export const GROUP_PUBLISHER = 'group_publisher';

@Entity()
export class Game {
  @Expose({ groups: [GROUP_GAME] })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Expose({ groups: [GROUP_GAME] })
  @Column()
  title: string;

  @Expose({ groups: [GROUP_GAME] })
  @Column()
  price: number;

  @Expose({ groups: [GROUP_GAME] })
  @Column()
  discount: number;

  @Expose({ groups: [GROUP_GAME] })
  @Column()
  releaseDate: string;

  @Expose({ groups: [GROUP_GAME, GROUP_PUBLISHER] })
  @ManyToOne(() => Publisher, (publisher) => publisher.games, { cascade: true })
  publisher: Publisher;
}
