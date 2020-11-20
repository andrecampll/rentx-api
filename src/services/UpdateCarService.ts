import { hash } from 'bcryptjs';
import Car from '../models/Car';
import ICarsRepository from '../repositories/cars/ICarsRepository';

interface IRequest {
  id: string;
  name?: string;
  brand?: string;
  daily_value?: number;
}

interface FieldError {
  field: string;
  message: string;
}

interface IResponse {
  car?: Car;
  errors?: FieldError[];
}

class ListCarsService {
  constructor(private carsRepository: ICarsRepository) {}

  public async execute({
    id,
    brand,
    daily_value,
    name,
  }: IRequest): Promise<IResponse> {
    const foundCar = await this.carsRepository.findById(id);

    if (!foundCar) {
      return {
        errors: [{
          field: 'id',
          message: 'Carro não encontrado.'
        }]
      }
    }

    if (brand) {
      foundCar.brand = brand;
    }

    if (name) {
      foundCar.name = name;
    }

    if (daily_value) {
      foundCar.daily_value = daily_value;
    }

    const car = await this.carsRepository.save(foundCar);

    return {
      car,
    };
  }
}

export default ListCarsService;
