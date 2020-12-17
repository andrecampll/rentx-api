import { buildSchema } from "type-graphql";
import { UserResolver } from '../resolvers/user';
import { CarResolver } from '../resolvers/car';
import { HelloResolver } from '../resolvers/hello';
import authenticationAssurance from "../middlewares/ensureAuthentication";

const wrapper = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, CarResolver, HelloResolver],
    authChecker: authenticationAssurance,
    validate: false,
  });

  return schema
};

export default wrapper;
