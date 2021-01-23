import FakePlacesRepository from '../repositories/fakes/FakePlacesRepository';
import DeletePlaceService from './DeletePlaceService';

let fakePlacesRepository: FakePlacesRepository;
let deletePlace: DeletePlaceService;

beforeEach(() => {
  fakePlacesRepository = new FakePlacesRepository();
  deletePlace = new DeletePlaceService(fakePlacesRepository);
});

describe('DeletePlaceService', () => {
  it('should be able to delete a place', async () => {
    const place = await fakePlacesRepository.create({
      id: '123456',
      country: 'Brasil',
      location: 'Cataratas do Iguaçu',
      goal: new Date(),
      flag_url: 'https://www.countryflags.io/br/flat/64.png',
    });

    const places = await fakePlacesRepository.find();

    await deletePlace.execute({
      id: place.id,
    });

    expect(places).not.toContain([place.id]);
  });
});
