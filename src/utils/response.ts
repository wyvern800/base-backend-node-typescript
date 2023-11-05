/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response as ResponseExpress } from 'express';
import ResponseBase from '../classes/ResponseBase';
import { IDataParams } from '../types/base.params';
import { DeepPartial } from '../types/deep.partial';

class Response extends ResponseBase {
  success = (
    response: ResponseExpress,
    data?: string | IDataParams | DeepPartial<unknown> | any | undefined,
  ): void => {
    if (typeof data === 'string') {
      response.status(200).json(data);
    } else if (!data) {
      response.status(400).json({ msg: 'The request was a success.' });
    } else {
      response.status(200).json(data);
    }
  };

  error = (
    response: ResponseExpress,
    data?: string | IDataParams | any | undefined,
  ): void => {
    if (typeof data === 'string') {
      response.status(400).json(data);
    } else if (!data) {
      response.status(400).json({ error: 'Something unexpected happened.' });
    } else {
      response.status(400).json(data);
    }
  };

  notFound = (
    response: ResponseExpress,
    data?: string | IDataParams | any | undefined,
  ): void => {
    if (typeof data === 'string') {
      response.status(404).json(data);
    } else if (!data) {
      response.status(404).json({ error: 'This could not be found.' });
    } else {
      response.status(404).json(data);
    }
  };

  internalError = (
    response: ResponseExpress,
    data?: string | IDataParams | any | undefined,
  ): void => {
    if (typeof data === 'string') {
      response.status(500).json(data);
    } else if (!data) {
      response.status(500).json({ error: 'Internal server error.' });
    } else {
      response.status(500).json(data);
    }
  };

  unauthorized = (
    response: ResponseExpress,
    data?: string | IDataParams | any | undefined,
  ): void => {
    if (typeof data === 'string') {
      response.status(401).json(data);
    } else if (!data) {
      response.status(401).json({ error: 'This request was not allowed.' });
    } else {
      response.status(401).json(data);
    }
  };

  successEmpty = (response: ResponseExpress): void => {
    response.status(200).json({});
  };
}

export default new Response();
