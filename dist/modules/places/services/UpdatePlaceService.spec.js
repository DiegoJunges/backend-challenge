"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dateFns = require("date-fns");

var _FakePlacesRepository = _interopRequireDefault(require("../repositories/fakes/FakePlacesRepository"));

var _UpdatePlaceService = _interopRequireDefault(require("./UpdatePlaceService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakePlacesRepository;
let updatePlace;
describe('UpdatePlaceService', () => {
  beforeEach(() => {
    fakePlacesRepository = new _FakePlacesRepository.default();
    updatePlace = new _UpdatePlaceService.default(fakePlacesRepository);
  });
  it('should be able to update a new place', async () => {
    const place = await fakePlacesRepository.create({
      id: '123456',
      country: 'Brasil',
      location: 'Cataratas do Iguaçu',
      goal: (0, _dateFns.startOfHour)(new Date(2022, 4, 3, 25)),
      flag_url: 'https://www.countryflags.io/br/flat/64.png'
    });
    const updatedPlace = await updatePlace.execute({
      id: place.id,
      location: 'Chapada Diamantina',
      goal: (0, _dateFns.startOfHour)(new Date(2023, 4, 3, 25))
    });
    expect(updatedPlace.location).toBe('Chapada Diamantina');
    expect(updatedPlace.goal).toEqual(new Date(2023, 4, 3, 25));
  });
  it('should not be able to place a place that not exist', async () => {
    expect(updatePlace.execute({
      id: 'non-existing-place-id',
      location: 'non-existing-place-location',
      goal: new Date()
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});