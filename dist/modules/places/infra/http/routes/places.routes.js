"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _express = require("express");

var _PlacesController = _interopRequireDefault(require("../controllers/PlacesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const placesRouter = (0, _express.Router)();
const placesController = new _PlacesController.default();
placesRouter.get('/:id', placesController.show);
placesRouter.get('/', placesController.index);
placesRouter.post('/', placesController.create);
placesRouter.delete('/:id', placesController.destroy);
placesRouter.patch('/:id', placesController.update);
var _default = placesRouter;
exports.default = _default;