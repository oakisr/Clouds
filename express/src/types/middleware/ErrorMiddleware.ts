/**
 * @module types/middleware
 * @description Defines types for MiddlewareArrayHandler functions and arrays.
 */

import { NextFunction, Request, Response } from 'express';

/**
 * @type ErrorMiddleware
 * @description Error MiddlewareArrayHandler function type.
 */
export type ErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => void;

export default ErrorMiddleware;