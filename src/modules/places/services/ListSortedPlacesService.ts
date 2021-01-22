import 'reflect-metadata';
import { getCustomRepository } from 'typeorm';

import Place from '@modules/places/infra/typeorm/entities/Place';
import AppError from '@shared/errors/AppError';
import PlacesRepository from '@modules/places/infra/typeorm/repositories/PlacesRepository';

class ListSortedPlacesService {
  public async execute(): Promise<Place[]> {
    const placesRepository = getCustomRepository(PlacesRepository);

    const places = await placesRepository.find();

    if (places.length <= 0) {
      throw new AppError('No places found');
    }

    // Using implicit casting to compare goal(Date) but only for comparison purposes not for subtraction.

    const sortPlacesByGoal = places.sort((a, b) => {
      if (a.goal === b.goal) {
        return 0;
      }

      return a.goal > b.goal ? 1 : -1;
    });

    return sortPlacesByGoal;
  }
}

export default ListSortedPlacesService;
