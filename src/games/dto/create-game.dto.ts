import { Publisher } from '../entities/publisher.entity';

export class CreateGameDto {
  title: string;
  price: number;
  releaseDate: string;
  publisher: Publisher;
}
