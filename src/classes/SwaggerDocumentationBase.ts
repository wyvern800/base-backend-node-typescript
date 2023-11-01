import { Express } from 'express';
import { Controller } from '../types/controller';

export default abstract class SwaggerDocumentationBase {
  /**
   * Inits the swagger instance
   *
   * @param { Express } app  The app
   * @param { Controller[] } routes The routes
   */
  abstract init(app: Express, routes: Controller[]): void;
}
