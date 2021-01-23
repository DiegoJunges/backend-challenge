import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Place from '@modules/places/infra/typeorm/entities/Place';
import AppError from '@shared/errors/AppError';
import IPlaceRepository from '../repositories/IPlaceRepository';

@injectable()
class ListSortedPlacesService {
  constructor(
    @inject('PlacesRepository')
    private placeRepository: IPlaceRepository,
  ) {}

  public async execute(): Promise<Place[]> {
    const places = await this.placeRepository.find();

    if (places.length <= 0) {
      throw new AppError('No places found');
    }

    // Logic to list places by crescent date, using implicit casting to compare goal(Date) but only for comparison purposes not for subtraction.

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
