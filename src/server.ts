import express, { Request, Response } from 'express';
import morgan from 'morgan';
import 'reflect-metadata';
import cors from 'cors';
import AppDataSource from './data-source';
import { Controller } from './types/controller';
import endPoints from './endpoints';
import GenericError from './utils/errorTypes/generic';
import errorHandler from './middlewares/ErrorHandler';
import Swagger from './utils/swagger';
import ResponseBase from './utils/response';

require('dotenv').config();

const app = express();

const PORT = 3333;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(errorHandler);

// Enable All CORS Requests
app.use(cors());

// Initializes the swagger documentation
new Swagger(app, endPoints).init();

// Construct all the routes
endPoints.forEach((route: Controller): void => {
  app.use(route.endpoint, route.controller);
});

// Error handling middleware for 404 Not Found
app.use((req: Request, res: Response) => {
  ResponseBase.notFound(res, { error: 'Route not found' });
});

// Error handling middleware for other errors
app.use((err: Error, req: Request, res: Response) => {
  ResponseBase.internalError(res, { error: 'Internal server error' });
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((_: any) => {
    throw new GenericError('Something unexpected happened');
  });

app.listen(PORT, () => {
  console.log(`Server started to http://localhost:${process.env.APP_PORT}/`);
});
