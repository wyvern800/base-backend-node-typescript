/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response as ResponseExpress } from 'express';
import ResponseBase from '../classes/ResponseBase';
import { IDataParams } from '../types/base.params';
import { DeepPartial } from '../types/deep.partial';

class Response extends ResponseBase {
  success = (
    response: ResponseExpress,
    data: string | IDataParams | DeepPartial<unknown>,
  ): void => {
    if (typeof data === 'string') {
      response.status(200).json(data);
    } else {
      response.status(200).json(data);
    }
  };

  error = (
    response: ResponseExpress,
    data: string | IDataParams | any,
  ): void => {
    if (typeof data === 'string') {
      response.status(400).json(data);
    } else {
      response.status(400).json(data);
    }
  };

  notFound = (
    response: ResponseExpress,
    data: string | IDataParams | any,
  ): void => {
    if (typeof data === 'string') {
      response.status(404).json(data);
    } else {
      response.status(404).json(data);
    }
  };

  internalError = (
    response: ResponseExpress,
    data: string | IDataParams | any,
  ): void => {
    if (typeof data === 'string') {
      response.status(404).json(data);
    } else {
      response.status(404).json(data);
    }
  };

  unauthorized = (
    response: ResponseExpress,
    data: string | IDataParams | any,
  ): void => {
    if (typeof data === 'string') {
      response.status(401).json(data);
    } else {
      response.status(401).json(data);
    }
  };

  successEmpty = (response: ResponseExpress): void => {
    response.status(200).json({});
  };
}

export default new Response();
