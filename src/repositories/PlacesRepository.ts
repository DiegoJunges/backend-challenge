import { EntityRepository, Repository } from 'typeorm';
import Place from '../models/Place';

@EntityRepository(Place)
class PlacesRepository extends Repository<Place> {
  public async findLocationAlreadyUsed(
    location: string,
  ): Promise<Place | null> {
    // const findLocationAlreadyUsed = this.places.find(
    //   place => place.location === location,
    // );

    const findLocationAlreadyUsed = await this.findOne({
      where: { location },
    });

    return findLocationAlreadyUsed || null;
  }
}

export default PlacesRepository;
