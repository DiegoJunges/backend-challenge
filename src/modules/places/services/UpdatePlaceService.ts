import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Place from '@modules/places/infra/typeorm/entities/Place';
import AppError from '@shared/errors/AppError';
import IPlaceRepository from '../repositories/IPlaceRepository';

interface IRequest {
  id: string;
  location: string;
  goal: Date;
}

@injectable()
class UpdatePlaceService {
  constructor(
    @inject('PlacesRepository')
    private placeRepository: IPlaceRepository,
  ) {}

  public async execute({ id, location, goal }: IRequest): Promise<Place> {
    const place = await this.placeRepository.findPlaceById(id);

    if (!place) {
      throw new AppError('Place does not exist');
    }

    this.placeRepository.updatePlace(id, location, goal);

    place.location = location;

    place.goal = goal;

    const result = await this.placeRepository.save(place);

    return result;
  }
}

export default UpdatePlaceService;
