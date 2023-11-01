import * as swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { Express } from 'express';
import SwaggerDocumentationBase from '../classes/SwaggerDocumentationBase';
import { Controller } from '../types/controller';
import { SwaggerInstance } from '../types/swagger.instance';
import GenericError from './errorTypes/generic';

/**
 * Swagger documentation instance
 */
export default class Swagger extends SwaggerDocumentationBase {
  private swaggerInstance: SwaggerInstance = {};

  /**
   * Constructor for the swagger instance
   *
   * @param { Express } app The app
   * @param { Controller[] } routes The routes
   */
  constructor(app: Express, routes: Controller[]) {
    super();

    const parseRoutes = routes.map(endpoint =>
      path.join(
        process.cwd(),
        `./src/endpoints/${endpoint.endpoint.replace('/', '')}/${
          endpoint.endpoint
        }.controller.ts`,
      ),
    );

    // Swagger configuration
    const swaggerOptions = {
      swaggerDefinition: {
        info: {
          title: 'Base API Node w/ TypeScript',
          description: 'Your API Description',
          version: '1.0.0',
        },
        securityDefinitions: {
          JwtWebToken: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
          },
        },
      },
      apis: parseRoutes,
    };

    try {
      const swaggerSpec = swaggerJSDoc(swaggerOptions);

      this.swaggerInstance = {
        app,
        serve: swaggerUi.serve,
        setup: swaggerUi.setup(swaggerSpec),
      };
    } catch (err) {
      throw new GenericError('Could not init swagger');
    }
  }

  /**
   * Initializes the swagger instance
   */
  init(): void {
    const { app, serve, setup } = this.swaggerInstance;
    if (app && serve && setup) {
      app.use('/swagger', serve, setup);
    }
  }
}
