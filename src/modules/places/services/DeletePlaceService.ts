import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IPlaceRepository from '../repositories/IPlaceRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('PlacesRepository')
    private placesRepository: IPlaceRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.placesRepository.delete(id);
  }
}

export default DeleteProductService;
