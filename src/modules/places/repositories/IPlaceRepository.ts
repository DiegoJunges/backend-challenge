import Place from '@modules/places/infra/typeorm/entities/Place';
import ICreatePlaceDTO from '../dtos/ICreatePlaceDTO';

export default interface IPlacesRepository {
  create(data: ICreatePlaceDTO): Promise<Place>;
  find(): Promise<Place[]>;
  findLocationAlreadyUsed(location: string): Promise<Place | undefined>;
  delete(id: string): Promise<void>;
  save(place: Place): Promise<Place>;
  findPlaceById(id: string): Promise<Place | undefined>;
  updatePlace(id: string, location: string, goal: Date): Promise<Place>;
}
