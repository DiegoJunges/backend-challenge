import AppError from '@shared/errors/AppError';
import FakePlacesRepository from '../repositories/fakes/FakePlacesRepository';
import ListPlaceByIdService from './ListPlaceByIdService';

let fakePlacesRepository: FakePlacesRepository;
let findPlaceById: ListPlaceByIdService;

beforeEach(() => {
  fakePlacesRepository = new FakePlacesRepository();
  findPlaceById = new ListPlaceByIdService(fakePlacesRepository);
});

describe('ListPlaceByIdService', () => {
  it('should be able to list a place by id', async () => {
    const place = await fakePlacesRepository.create({
      id: '123456',
      country: 'Brasil',
      location: 'Cataratas do Iguaçu',
      goal: new Date(),
      flag_url: 'https://www.countryflags.io/br/flat/64.png',
    });

    const places = await findPlaceById.execute(place.id);

    expect(place.id).toEqual(places?.id);
  });

  it('should not be able to list a place that not exist', async () => {
    expect(
      findPlaceById.execute('non-existing-place-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
