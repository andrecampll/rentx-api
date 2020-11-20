import { hash } from 'bcryptjs';
import Car from '../models/Car';
import ICarsRepository from '../repositories/cars/ICarsRepository';

interface IRequest {
  id: string;
}

interface FieldError {
  field: string;
  message: string;
}

interface IResponse {
  car?: Car;
  errors?: FieldError[];
}

class DeleteCarService {
  constructor(private carsRepository: ICarsRepository) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const foundCar = await this.carsRepository.findById(id);

    if (!foundCar) {
      return {
        errors: [{
          field: 'id',
          message: 'Carro não encontrado.'
        }]
      }
    }

    await this.carsRepository.destroy(id);

    return {
      car: undefined
    };
  }
}

export default DeleteCarService;
