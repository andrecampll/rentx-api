import { Request, Response } from 'express';
import UserRepository from '../repositories/UsersRepository';
import CreateSessionsService from '../services/CreateSessionService';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userRepository = new UserRepository();

    const authenticatedUser = new CreateSessionsService(userRepository);

    const { user, token } = await authenticatedUser.execute({
      email,
      password,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json({ userWithoutPassword, token });
  }
}

export default SessionController;
