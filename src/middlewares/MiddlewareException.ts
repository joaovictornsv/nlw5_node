/* eslint-disable no-unused-vars */
import {
  Request, Response, NextFunction,
} from 'express';
import { HttpException } from './HttpException';

export default (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof HttpException) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }
};
