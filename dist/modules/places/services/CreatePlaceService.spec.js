"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakePlacesRepository = _interopRequireDefault(require("../repositories/fakes/FakePlacesRepository"));

var _CreatePlaceService = _interopRequireDefault(require("./CreatePlaceService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakePlacesRepository;
let createPlace;
describe('CreatePlaceService', () => {
  beforeEach(() => {
    fakePlacesRepository = new _FakePlacesRepository.default();
    createPlace = new _CreatePlaceService.default(fakePlacesRepository);
  });
  it('should be able to create a new place', async () => {
    const place = await createPlace.execute({
      id: '123456',
      country: 'Brasil',
      location: 'Cataratas do Iguaçu',
      goal: new Date(),
      flag_url: 'https://www.countryflags.io/br/flat/64.png'
    });
    expect(place).toHaveProperty('id');
    expect(place).toHaveProperty('country');
    expect(place).toHaveProperty('location');
    expect(place).toHaveProperty('goal');
    expect(place.flag_url).toBe('https://www.countryflags.io/br/flat/64.png');
  });
  it('should not be able to create a place with location that are already in use', async () => {
    await createPlace.execute({
      id: '123456',
      country: 'Brasil',
      location: 'Cataratas do Iguaçu',
      goal: new Date(),
      flag_url: 'https://www.countryflags.io/br/flat/64.png'
    });
    expect(createPlace.execute({
      id: '123456',
      country: 'Brasil',
      location: 'Cataratas do Iguaçu',
      goal: new Date(),
      flag_url: 'https://www.countryflags.io/br/flat/64.png'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});