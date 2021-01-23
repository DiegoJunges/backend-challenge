import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import PlacesRepository from '@modules/places/infra/typeorm/repositories/PlacesRepository';

import AppError from '@shared/errors/AppError';

import Place from '@modules/places/infra/typeorm/entities/Place';
import IPlaceRepository from '../repositories/IPlaceRepository';

interface IRequest {
  id: string;
  country: string;
  location: string;
  goal: Date;
  flag_url: string;
}

@injectable()
class CreatePlaceService {
  constructor(
    @inject('PlacesRepository')
    private placeRepository: IPlaceRepository,
  ) {}

  public async execute({
    id,
    country,
    location,
    goal,
    flag_url,
  }: IRequest): Promise<Place> {
    const locationAlreadyUsed = location;

    const findUsedLocation = await this.placeRepository.findLocationAlreadyUsed(
      locationAlreadyUsed,
    );

    if (findUsedLocation) {
      throw new AppError('Location already used');
    }

    const place = await this.placeRepository.create({
      id,
      country,
      location,
      goal,
      flag_url,
    });

    return place;
  }
}

export default CreatePlaceService;
