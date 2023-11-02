/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { DeepPartial } from '../types/deep.partial';
import { IDataParams } from '../types/base.params';

export default abstract class ResponseBase {
  /**
   * Sends a status 200 response with a body
   *
   * @param { Response } response The response
   * @param { IDataParams | string | DeepPartial<unknown> | any } data The response data
   */
  abstract success(
    response: Response,
    data: IDataParams | string | DeepPartial<unknown> | any,
  ): void;

  /**
   * Sends a status 400 response with a body
   *
   * @param { Response } response The response
   * @param { IDataParams | string | DeepPartial<unknown> | any } data The response data
   */
  abstract error(response: Response, data: IDataParams | string | any): void;

  /**
   * Sends a status 404 response with a body
   *
   * @param { Response } response The response
   * @param { IDataParams | string | DeepPartial<unknown> | any } data The response data
   */
  abstract notFound(response: Response, data: IDataParams | string | any): void;

  /**
   * Sends a status 400 response with a body
   *
   * @param { Response } response The response
   */
  abstract successEmpty(response: Response): void;

  /**
   * Sends a status 500 response with a body
   *
   * @param { Response } response The response
   * @param { IDataParams | string | DeepPartial<unknown> | any } data The response data
   */
  abstract internalError(
    response: Response,
    data: IDataParams | string | any,
  ): void;

  /**
   * Sends a status 401 response with a body
   *
   * @param { Response } response The response
   * @param { IDataParams | string | DeepPartial<unknown> | any } data The response data
   */
  abstract unauthorized(
    response: Response,
    data: IDataParams | string | any,
  ): void;
}
