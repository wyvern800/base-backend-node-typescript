import express from 'express';
import 'reflect-metadata';
import AppDataSource from './data-source';
import { Controller } from './types/controller';

import endPoints from './endpoints';

const app = express();

const PORT = 3333;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

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
  .catch(error => console.error(error));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
