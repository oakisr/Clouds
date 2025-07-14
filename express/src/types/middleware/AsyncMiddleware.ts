/**
 * @module types/middleware
 * @description Defines types for MiddlewareArrayHandler functions and arrays.
 */

import { Request, Response, NextFunction } from 'express';

/**
 * @type AsyncMiddleware
 * @description Asynchronous MiddlewareArrayHandler function type.
 */
export type AsyncMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export default AsyncMiddleware;
