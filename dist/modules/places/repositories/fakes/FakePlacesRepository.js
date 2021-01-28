"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Place = _interopRequireDefault(require("../../infra/typeorm/entities/Place"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakePlacesRepository {
  constructor() {
    this.places = [];
  }

  async findLocationAlreadyUsed(location) {
    const findPlaceAlreadyUsed = this.places.find(place => place.location === location);
    return findPlaceAlreadyUsed;
  }

  async find() {
    return this.places;
  }

  async findPlaceById(id) {
    const findPlace = this.places.find(place => place.id === id);
    return findPlace;
  }

  async create({
    country,
    location,
    goal,
    flag_url
  }) {
    const place = new _Place.default();
    Object.assign(place, {
      id: (0, _uuid.v4)(),
      country,
      location,
      goal,
      flag_url
    });
    this.places.push(place);
    return place;
  }

  async updatePlace(id, location, goal) {
    const place = new _Place.default();
    Object.assign(place, {
      id: (0, _uuid.v4)(),
      location,
      goal
    });
    place.location = location;
    place.goal = goal;
    this.places.push(place);
    return place;
  }

  async save(place) {
    const placeIndex = this.places.findIndex(findPlace => findPlace.id === place.id);
    this.places[placeIndex] = place;
    return place;
  }

  async delete(id) {
    const placeIndex = this.places.findIndex(place => place.id === id);
    delete this.places[placeIndex];
  }

}

var _default = FakePlacesRepository;
exports.default = _default;