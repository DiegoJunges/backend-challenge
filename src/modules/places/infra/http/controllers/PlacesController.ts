import CreatePlaceService from '@modules/places/services/CreatePlaceService';
import DeletePlaceService from '@modules/places/services/DeletePlaceService';
import ListPlaceByIdService from '@modules/places/services/ListPlaceByIdService';
import ListSortedPlacesService from '@modules/places/services/ListSortedPlacesService';
import UpdatePlaceService from '@modules/places/services/UpdatePlaceService';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PlaceController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id, country, location, goal, flag_url } = request.body;

    const parsedtoDateGoal = parseISO(goal);

    const createPlace = container.resolve(CreatePlaceService);

    const place = await createPlace.execute({
      id,
      country,
      location,
      goal: parsedtoDateGoal,
      flag_url,
    });

    return response.json(place);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listPlaces = container.resolve(ListSortedPlacesService);

    const places = await listPlaces.execute();

    return response.json(places);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeletePlaceService);

    await deleteProduct.execute({ id });

    return response.status(204).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findPlaceById = container.resolve(ListPlaceByIdService);

    const places = await findPlaceById.execute(id);

    return response.json(places);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { location, goal } = request.body;

    const updatePlace = container.resolve(UpdatePlaceService);
    const newPlace = await updatePlace.execute({
      id,
      location,
      goal,
    });
    return response.json(newPlace);
  }
}
