/**
 * @module paramValidator
 * @description Provides a function to validate request parameters and request bodies. Additionally, it contains a set
 * of defined validation chains for the parameters and request bodies used in the application.
 */
import { Request, Response, NextFunction, AsyncMiddleware, Middleware, MiddlewareArrayHandler } from '../types';
import { Errors } from '../modules';
import { validationResult } from 'express-validator';

/**
 * @function validate - Combines parameter validation MiddlewareArrayHandler functions into a single MiddlewareArrayHandler.
 * @param middlewares - MiddlewareArrayHandler functions for validating request parameters.
 * @returns A single MiddlewareArrayHandler function that executes the provided validation MiddlewareArrayHandler and then checks for validation errors.
 */
export const validate: MiddlewareArrayHandler = (...middlewares: Middleware[]): AsyncMiddleware => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (const middleware of middlewares) {
            // Use a promise to wait for potential async MiddlewareArrayHandler to complete.
            await new Promise<void>((resolve, reject) => {
                middleware(req, res, (err?: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }).catch(err => {
                next(err)}); // Handle any errors that occurred during MiddlewareArrayHandler execution.
        }

        // Once all MiddlewareArrayHandler have executed, check for validation errors.
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const error = result.array()[0] as { path: string, msg: string };
            const message = `${error.path.charAt(0).toUpperCase()}${error.path.slice(1)} ${error.msg}`;
            return next(Errors.badRequest(message));
        }
        next();
    };
};
