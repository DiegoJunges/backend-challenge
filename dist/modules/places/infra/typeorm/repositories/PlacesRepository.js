"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Place = _interopRequireDefault(require("../entities/Place"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PlacesRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Place.default);
  }

  async findLocationAlreadyUsed(location) {
    const findLocationAlreadyUsed = await this.ormRepository.findOne({
      where: {
        location
      }
    });
    return findLocationAlreadyUsed;
  }

  async find() {
    const countries = await this.ormRepository.find();
    return countries;
  }

  async findPlaceById(id) {
    const place = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return place;
  }

  async create(placeData) {
    const place = this.ormRepository.create(placeData);
    await this.ormRepository.save(place);
    return place;
  }

  async updatePlace(id, location, goal) {
    const place = await this.ormRepository.findOne(id);

    if (!place) {
      throw new _AppError.default('Place does not exist');
    }

    this.ormRepository.merge(place, {
      location,
      goal
    });
    const result = await this.ormRepository.save(place);
    return result;
  }

  async save(place) {
    return this.ormRepository.save(place);
  }

  async delete(id) {
    this.ormRepository.delete(id);
  }

}

var _default = PlacesRepository;
exports.default = _default;