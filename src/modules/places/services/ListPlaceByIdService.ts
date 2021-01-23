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

  public async execute(id: string): Promise<Place> {
    const place = await this.placeRepository.findPlaceById(id);

    if (!place) {
      throw new AppError('No place has been found');
    }

    return place;
  }
}

export default ListSortedPlacesService;
