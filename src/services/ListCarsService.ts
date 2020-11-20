import { hash } from 'bcryptjs';
import Car from '../models/Car';
import ICarsRepository from '../repositories/cars/ICarsRepository';
import { classToClass } from 'class-transformer';

interface FieldError {
  field: string;
  message: string;
}

interface Request {
  name: string;
  brand: string;
  daily_value: number;
}

interface IResponse {
  car?: Car;
  errors?: FieldError[];
}

class ListCarsService {
  constructor(private carsRepository: ICarsRepository) {}

  public async execute(): Promise<IResponse> {


    return {
      car: classToClass(car),
    };
  }
}

export default ListCarsService;
