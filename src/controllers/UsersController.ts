import { Request, Response } from 'express';
import User from '../models/User';

class UserController {
  public async create(request: Request, response: Response): Promise<User> {
    const { name, email, password } = request.body;

    const user = new User(name, email, password);

    return response.json(user);
  }
}

export default UserController;
