import { EntityRepository, Repository } from 'typeorm';

import IPlaceRepository from '@modules/places/repositories/IPlaceRepository';

import Place from '@modules/places/infra/typeorm/entities/Place';

@EntityRepository(Place)
class PlacesRepository extends Repository<Place> implements IPlaceRepository {
  public async findLocationAlreadyUsed(
    location: string,
  ): Promise<Place | undefined> {
    const findLocationAlreadyUsed = await this.findOne({
      where: { location },
    });

    return findLocationAlreadyUsed;
  }
}

export default PlacesRepository;
