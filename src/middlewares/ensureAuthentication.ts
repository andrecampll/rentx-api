import { verify } from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import authConfig from '../config/auth';

interface IContext {
  token?: string;
}

const authenticationAssurance: AuthChecker<IContext> = ({ context }): boolean => {
  const { token } = context;

  if (!token) return false;

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    return !!decoded;
  } catch {
    return false;
  }
};

export default authenticationAssurance
