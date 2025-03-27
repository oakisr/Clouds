/**
 * @module types/middleware
 * @description Defines types for MiddlewareArrayHandler functions and arrays.
 */

import AsyncMiddleware from "./AsyncMiddleware";
import Middleware from "./Middleware";

/**
 * @type MiddlewareArrayHandler
 * @description Validation MiddlewareArrayHandler function type.
 */
export type MiddlewareArrayHandler = (...middlewares: Middleware[]) => AsyncMiddleware;