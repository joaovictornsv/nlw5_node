/* eslint-disable no-unused-vars */
import { CelebrateError } from 'celebrate';
import {
  Request, Response, NextFunction,
} from 'express';
import { HttpException } from './HttpException';

export default (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof CelebrateError) {
    const errorBody = error.details.get('body');
    const { details } = errorBody;
    if (!details || details.length <= 0) {
      return response.status(400).json({
        status: 'error',
        message: 'Internal Celebrate Error',
      });
    }
    return response.status(400).json({
      status: 'error',
      message: `The field '${details[0].path[0]}' ${details[0].message}`,
    });
  }

  if (error instanceof HttpException) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  console.log(error);
  return response.status(400).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
