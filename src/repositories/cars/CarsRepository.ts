import { EntityRepository, getRepository, Repository } from 'typeorm';
import Car from '../../models/Car';
import ICreateCarDTO from './dtos/ICreateCarDTO';
import ICarsRepository from './ICarsRepository';

@EntityRepository(Car)
class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  public async create({
    name,
    brand,
    daily_value,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.ormRepository.create({
      name,
      brand,
      daily_value,
    });

    await this.ormRepository.save(car);

    return car;
  }
}

export default CarsRepository;
