import Place from '@modules/places/infra/typeorm/entities/Place';

export default interface IPlacesRepository {
  findOne(location: string): Promise<Place | undefined>;
}
