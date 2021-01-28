"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreatePlaceService = _interopRequireDefault(require("../../../services/CreatePlaceService"));

var _DeletePlaceService = _interopRequireDefault(require("../../../services/DeletePlaceService"));

var _ListPlaceByIdService = _interopRequireDefault(require("../../../services/ListPlaceByIdService"));

var _ListSortedPlacesService = _interopRequireDefault(require("../../../services/ListSortedPlacesService"));

var _UpdatePlaceService = _interopRequireDefault(require("../../../services/UpdatePlaceService"));

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PlaceController {
  async create(request, response) {
    const {
      id,
      country,
      location,
      goal,
      flag_url
    } = request.body;
    const parsedtoDateGoal = (0, _dateFns.parseISO)(goal);

    const createPlace = _tsyringe.container.resolve(_CreatePlaceService.default);

    const place = await createPlace.execute({
      id,
      country,
      location,
      goal: parsedtoDateGoal,
      flag_url
    });
    return response.json(place);
  }

  async index(request, response) {
    const listPlaces = _tsyringe.container.resolve(_ListSortedPlacesService.default);

    const places = await listPlaces.execute();
    return response.json(places);
  }

  async destroy(request, response) {
    const {
      id
    } = request.params;

    const deleteProduct = _tsyringe.container.resolve(_DeletePlaceService.default);

    await deleteProduct.execute({
      id
    });
    return response.status(204).send();
  }

  async show(request, response) {
    const {
      id
    } = request.params;

    const findPlaceById = _tsyringe.container.resolve(_ListPlaceByIdService.default);

    const places = await findPlaceById.execute(id);
    return response.json(places);
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      location,
      goal
    } = request.body;

    const updatePlace = _tsyringe.container.resolve(_UpdatePlaceService.default);

    const newPlace = await updatePlace.execute({
      id,
      location,
      goal
    });
    return response.json(newPlace);
  }

}

exports.default = PlaceController;