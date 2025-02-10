/**
 * @module types/middleware
 * @description Defines types for Middleware functions and arrays.
 */

import { Request, Response, NextFunction } from 'express';

/**
 * @type Middleware
 * @description Middleware function type.
 */
export type Middleware = (req: Request, res: Response, next: NextFunction) => void;

/**
 * @type AsyncMiddleware
 * @description Asynchronous Middleware function type.
 */
export type AsyncMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

/**
 * @type ErrorMiddleware
 * @description Error Middleware function type.
 */
export type ErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => void;

/**
 * @type MiddlewareArray
 * @description Middleware array type.
 */
export type MiddlewareArray = Middleware[];

/**
 * @type MiddlewareArrayHandler
 * @description Validation Middleware function type.
 */
export type MiddlewareArrayHandler = (...middlewares: MiddlewareArray) => AsyncMiddleware;