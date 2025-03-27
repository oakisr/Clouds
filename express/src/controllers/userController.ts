import { Request, Response, NextFunction, Middleware } from '../types';
import { User } from '../models';
import { Errors } from '../modules';

import { validate } from "../modules";

export const getById: Middleware[] = [
    validate(User.param.id),
    async (req: Request, res: Response, next: NextFunction) => {
        const id: number  = Number.parseInt(req.params.id);
        const user: User = await User.getById(id);

        if (!user) {
            return next(Errors.notFound('User not found in the database.'));
        }
        res.status(200).json(user);
    }
];