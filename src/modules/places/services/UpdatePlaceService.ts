import 'reflect-metadata';

import { getCustomRepository } from 'typeorm';
import Place from '@modules/places/infra/typeorm/entities/Place';
import AppError from '@shared/errors/AppError';
import ProductsRepository from '@modules/places/infra/typeorm/repositories/PlacesRepository';

interface IRequest {
  id: string;
  location: string;
  goal: Date;
}

class UpdatePlaceService {
  public async execute({ id, location, goal }: IRequest): Promise<Place> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const place = await productsRepository.findOne(id);

    if (!place) {
      throw new AppError('Place does not exist');
    }

    productsRepository.merge(place, {
      location,
      goal,
    });

    const result = await productsRepository.save(place);

    return result;
  }
}

export default UpdatePlaceService;
