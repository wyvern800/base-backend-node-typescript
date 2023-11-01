import express from 'express';
import morgan from 'morgan';
import 'reflect-metadata';
import cors from 'cors';
import AppDataSource from './data-source';
import { Controller } from './types/controller';
import endPoints from './endpoints';
import GenericError from './utils/errorTypes/generic';
import errorHandler from './middlewares/ErrorHandler';
import Swagger from './utils/swagger';

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
endPoints.forEach((endPoint: Controller): void => {
  app.use(endPoint.endpoint, endPoint.controller);
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
  console.log(`Server started on port ${PORT}`);
});
