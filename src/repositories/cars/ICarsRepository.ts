import Car from '../../models/Car';
import CreateCarDTO from './dtos/CreateCarDTO';

export default interface ICarsRepository {
  create(data: CreateCarDTO): Promise<Car>;
  findByEmail(email: string):Promise<Car | undefined>;
}
