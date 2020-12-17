import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';

import cors from 'cors';
import AppError from './errors/AppError';
import './database';

import buildSchema from './schemas';
import { ApolloServer } from 'apollo-server-express';

const app = express();

app.use(cors({
  origin: "http://localhost:8081",
  credentials: true,
}));
app.use(errors());

const main = async () => {
  const schema = await buildSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context = {
        req,
        token: req?.headers?.authorization,
      };

      return context;
    }
  });

  apolloServer.applyMiddleware({
    app,
    cors: false
  });

  app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  });

  app.listen(3333, () => {
    console.log('🚀 Server started on port 3333');
  });
}

main().catch(error => {
  console.log(error);
});
