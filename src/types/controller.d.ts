import { Router } from 'express';
/**
 * Controller type
 */
export type Controller = {
  endpoint: string;
  controller: Router;
};
