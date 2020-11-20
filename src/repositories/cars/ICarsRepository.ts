import Car from '../../models/Car';
import CreateCarDTO from './dtos/ICreateCarDTO';

export default interface ICarsRepository {
  create(data: CreateCarDTO): Promise<Car>;
}
