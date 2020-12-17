import { verify } from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import authConfig from '../config/auth';

interface IContext {
  token?: string;
}

const authenticationAssurance: AuthChecker<IContext> = ({ context }): boolean => {
  const authHeaders = context.token;

  if (!authHeaders) return false;

  const [, token] = authHeaders.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    return !!decoded;
  } catch {
    return false;
  }
};

export default authenticationAssurance
