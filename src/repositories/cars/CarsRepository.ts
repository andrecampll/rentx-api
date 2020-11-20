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

  public async findAll(): Promise<Car[]> {
    const cars = await this.ormRepository.find();

    return cars;
  }

  public async findById(id: string): Promise<Car | undefined> {
    const car = await this.ormRepository.findOne({
      where: { id }
    });

    return car;
  }

  public async save(car: Car): Promise<Car> {
    return await this.ormRepository.save(car);
  }

  public async destroy(id: string): Promise<void> {
    await this.ormRepository.delete({
      id
    });
  }
}

export default CarsRepository;
