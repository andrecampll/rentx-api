import Car from '../../models/Car';
import CreateCarDTO from './dtos/ICreateCarDTO';

export default interface ICarsRepository {
  create(data: CreateCarDTO): Promise<Car>;
  findAll(): Promise<Car[]>;
  findById(id: string): Promise<Car | undefined>;
  save(car: Car): Promise<Car>;
  destroy(id: string): Promise<void>;
}
