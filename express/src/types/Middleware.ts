import { Request, Response, NextFunction } from 'express';

/**
 * @type Middleware
 * @description Middleware function type.
 */
export type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export default Middleware;