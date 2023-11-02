/* eslint-disable global-require */
import * as fs from 'fs';
import * as path from 'path';
import { Controller } from '../types/controller';

const controllers: Controller[] = [];

const endpointFolder = path.join(__dirname);

// Reads the files
fs.readdirSync(endpointFolder)
  .filter(file => file !== 'index.ts')
  .forEach(endpointName => {
    const controllerPath = path.join(
      endpointFolder,
      endpointName,
      `${endpointName}.controller.ts`,
    );
    if (fs.existsSync(controllerPath)) {
      // eslint-disable-next-line
      const controller = require(controllerPath).default;
      controllers.push({
        endpoint: `/${endpointName}`,
        controller,
      });
    }
  });

export default controllers;
