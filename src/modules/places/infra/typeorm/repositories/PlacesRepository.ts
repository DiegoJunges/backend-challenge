import { getRepository, Repository } from 'typeorm';

import IPlaceRepository from '@modules/places/repositories/IPlaceRepository';

import Place from '@modules/places/infra/typeorm/entities/Place';
import ICreatePlaceDTO from '@modules/places/dtos/ICreatePlaceDTO';
import AppError from '@shared/errors/AppError';

class PlacesRepository implements IPlaceRepository {
  private ormRepository: Repository<Place>;

  constructor() {
    this.ormRepository = getRepository(Place);
  }

  public async findLocationAlreadyUsed(
    location: string,
  ): Promise<Place | undefined> {
    const findLocationAlreadyUsed = await this.ormRepository.findOne({
      where: { location },
    });

    return findLocationAlreadyUsed;
  }

  public async find(): Promise<Place[]> {
    const countries = await this.ormRepository.find();

    return countries;
  }

  public async findPlaceById(id: string): Promise<Place | undefined> {
    const place = await this.ormRepository.findOne({
      where: { id },
    });

    return place;
  }

  public async create(placeData: ICreatePlaceDTO): Promise<Place> {
    const place = this.ormRepository.create(placeData);

    await this.ormRepository.save(place);

    return place;
  }

  public async updatePlace(
    id: string,
    location: string,
    goal: Date,
  ): Promise<Place> {
    const place = await this.ormRepository.findOne(id);

    if (!place) {
      throw new AppError('Place does not exist');
    }

    this.ormRepository.merge(place, { location, goal });

    const result = await this.ormRepository.save(place);

    return result;
  }

  public async save(place: Place): Promise<Place> {
    return this.ormRepository.save(place);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}

export default PlacesRepository;
