import { Express, RequestHandler } from 'express';

export type SwaggerInstance = {
  app?: Express;
  serve?: RequestHandler[];
  setup?: RequestHandler;
};
