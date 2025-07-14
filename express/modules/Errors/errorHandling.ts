import { NextFunction, Request, Response, Middleware, ErrorMiddleware } from "../../src/types";
import { HTTP_STATUS } from "./HTTP_STATUS";

/**
 * @class Explicit error
 */
class CustomError extends Error {
    statusCode: number; // Making statusCode optional
    title: string;
    description: string;
    details?: string;

    /**
     * @constructor
     * @param error - Error object.
     * @param details - Custom information.
     */
    constructor(error: {
        statusCode: number;
        title: string;
        description: string;
    }, details?: string) {
        super();
        this.statusCode = error.statusCode;
        this.title = error.title;
        this.description = error.description;
        this.details = details;
    }
}

export const Errors = new Proxy<{ [key: string]: (details?: string) => CustomError }>({}, {
    get(target, prop: string) {
        if (prop in HTTP_STATUS.clientError) {
            return (details?: string) => new CustomError(HTTP_STATUS.clientError[prop as keyof typeof HTTP_STATUS.clientError], details);
        } else if (prop in HTTP_STATUS.serverError) {
            return (details?: string) => new CustomError(HTTP_STATUS.serverError[prop as keyof typeof HTTP_STATUS.serverError], details);
        }
        return new CustomError(HTTP_STATUS.serverError.internalServerError);
    }
});

/**
 * @function notFoundHandler - Handles 404 errors by passing them to the error handling Middleware.
 */
export const notFoundHandler: Middleware = (_req: Request, _res: Response, next: NextFunction) => {
    next(Errors.notFound());
}

/**
 * @function errorHandler - Handles errors by sending back a CustomError object as a response.
 */
export const errorHandler: ErrorMiddleware = (error: unknown, req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof CustomError) return res.json(error);
    if (error instanceof SyntaxError && (error as any).type === "entity.parse.failed") {
        return res.json(Errors.badRequest('Invalid JSON'));
    }
    res.json(Errors.internalServerError());
};

